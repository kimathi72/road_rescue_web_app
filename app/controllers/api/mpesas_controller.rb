module Api
  class MpesasController < ApplicationController
    require "rest-client"
    skip_before_action :authorized, only: [:stkreceive]

    def stkpush
      phoneNumber = mpesa_params[:phoneNumber].gsub(/^0/, "254")
      amount = mpesa_params[:amount]
      url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
      timestamp = Time.now.strftime("%Y%m%d%H%M%S")
      business_short_code = ENV["MPESA_SHORTCODE"]
      password = Base64.strict_encode64("#{business_short_code}#{ENV["MPESA_PASSKEY"]}#{timestamp}")

      payload = {
        BusinessShortCode: business_short_code,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: "1",
        PartyA: phoneNumber,
        PartyB: business_short_code,
        PhoneNumber: phoneNumber,
        CallBackURL: "#{ENV["CALLBACK_URL"]}/api/callback_url",
        AccountReference: "Road Rescue App",
        TransactionDesc: "Payment for rescue services",
      }.to_json

      headers = {
        'Content-Type': "application/json",
        Authorization: "Bearer #{get_access_token}",
      }

      response = RestClient.post(url, payload, headers)
      Rails.logger.info "STK Response: #{response.code} - #{response.body}"

      parsed = JSON.parse(response.body)
      if response.code == 200 && parsed["ResponseCode"] == "0"
        Mpesa.create!(
          invoice_id: mpesa_params[:invoice_id],
          phoneNumber: phoneNumber,
          amount: amount,
          checkoutRequestID: parsed["CheckoutRequestID"],
          merchantRequestID: parsed["MerchantRequestID"],
          status: "pending",
        )
      end

      render json: parsed, status: response.code
    rescue RestClient::ExceptionWithResponse => e
      Rails.logger.error "STK Push failed: #{e.response}"
      render json: { error: e.response }, status: :bad_gateway
    end

    def stkquery
      url = "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query"
      timestamp = "#{Time.now.strftime "%Y%m%d%H%M%S"}"
      business_short_code = ENV["MPESA_SHORTCODE"]
      password = Base64.strict_encode64("#{business_short_code}#{ENV["MPESA_PASSKEY"]}#{timestamp}")
      payload = {
        'BusinessShortCode': business_short_code,
        'Password': password,
        'Timestamp': timestamp,
        'CheckoutRequestID': params[:checkoutRequestID],
      }.to_json

      headers = {
        Content_type: "application/json",
        Authorization: "Bearer #{get_access_token}",
      }

      response = RestClient::Request.new({
        method: :post,
        url: url,
        payload: payload,
        headers: headers,
      }).execute do |response, request|
        case response.code
        when 500
          [:error, JSON.parse(response.to_str)]
        when 400
          [:error, JSON.parse(response.to_str)]
        when 200
          [:success, JSON.parse(response.to_str)]
        else
          fail "Invalid response #{response.to_str} received."
        end
      end
      render json: response
    end

    def stkreceive
      # Log the raw callback data for debugging
      Rails.logger.info "M-Pesa Callback Received: #{params.inspect}"

      # Extract relevant data from the callback
      callback_data = params["Body"]["stkCallback"] # Adjust based on the actual M-Pesa callback structure

      # Process the data (e.g., save to database, update order status)
      if callback_data["ResultCode"] == 0
        # Transaction successful
        transaction_id = callback_data["CheckoutRequestID"]
        receipt_number = callback_data["CallbackMetadata"]["Item"].find { |item| item["Name"] == "MpesaReceiptNumber" }["Value"]
        amount = callback_data["CallbackMetadata"]["Item"].find { |item| item["Name"] == "Amount" }["Value"]
        phone_number = callback_data["CallbackMetadata"]["Item"].find { |item| item["Name"] == "PhoneNumber" }["Value"]

        # Example: Update an order or create a payment record
        mpesa = Mpesa.find_by(checkoutRequestID: transaction_id)
        if mpesa
          mpesa.update(
            mpesaReceiptNumber: receipt_number,
            amount: amount,
            phoneNumber: phone_number,
            status: "completed", # Add a `status` column to mpesas table
          )
        else
          # Create a record if not found (fallback)
          Mpesa.create!(
            checkoutRequestID: transaction_id,
            mpesaReceiptNumber: receipt_number,
            amount: amount,
            phoneNumber: phone_number,
            status: "completed",
          )
        end
        invoice = mpesa.invoice
        invoice.update(status: "paid") if invoice
        ActionCable.server.broadcast(
          "mpesa_#{callback_data["CheckoutRequestID"]}",
          { status: "success", receipt: receipt_number }
        )

        render json: { message: "Callback received and processed successfully." }, status: :ok
      else
        # Transaction failed or was cancelled
        error_message = callback_data["ResultDesc"]
        Rails.logger.error "M-Pesa Transaction Failed: #{error_message}"
        ActionCable.server.broadcast(
          "mpesa_#{callback_data["CheckoutRequestID"]}",
          { status: "failed", message: error_message }
        )
        render json: { message: "Callback received, but transaction failed." }, status: :unprocessable_entity
      end
    rescue => e
      Rails.logger.error "Error processing M-Pesa callback: #{e.message}"
      render json: { message: "Error processing callback." }, status: :internal_server_error
    end

    private

    def mpesa_params
      params.require(:mpesa).permit(:invoice_id, :checkoutRequestID, :merchantRequestID, :phoneNumber, :amount, :mpesaReceiptNumber)
    end

    def generate_access_token_request
      @url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
      @consumer_key = ENV["MPESA_CONSUMER_KEY"]
      @consumer_secret = ENV["MPESA_CONSUMER_SECRET"]
      @userpass = Base64::strict_encode64("#{@consumer_key}:#{@consumer_secret}")
      headers = {
        Authorization: "Bearer #{@userpass}",
      }
      res = RestClient::Request.execute(url: @url, method: :get, headers: {
                                          Authorization: "Basic #{@userpass}",
                                        })
      res
    end

    def get_access_token
      res = generate_access_token_request()
      if res.code != 200
        r = generate_access_token_request()
        if res.code != 200
          raise MpesaError("Unable to generate access token")
        end
      end
      body = JSON.parse(res, { symbolize_names: true })
      token = body[:access_token]
      AccessToken.destroy_all()
      AccessToken.create!(token: token)
      token
    end
  end
end
