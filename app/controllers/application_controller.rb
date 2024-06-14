class ApplicationController < ActionController::API
    include ActionController::Cookies
    require 'sendgrid-ruby'
    include SendGrid
    # require 'net/http'
    # require 'uri'
   
    before_action :authorized

    def encode_token(payload)
      # should store secret in env variable
      JWT.encode(payload, 'my_s3cr3t')
    end
  
    def auth_header
      # { Authorization: 'Bearer <token>' }
      request.headers['Authorization']
    end
  
    def decoded_token
      if auth_header
        token = auth_header.split(' ')[1]
        # header: { 'Authorization': 'Bearer <token>' }
        begin
          JWT.decode(token, 'my_s3cr3t', true, algorithm: 'HS256')
        rescue JWT::DecodeError
          nil
        end
      end
    end
  
    def current_user
      if decoded_token
        user_id = decoded_token[0]['user_id']
        @user = User.find_by(id: user_id)
      end
    end
  
    def logged_in?
      !!current_user
    end
  
    def authorized
      render json: { message: 'Please log in' }, status: :unauthorized unless logged_in?
    end
    def sendgrid_email (email:, token:)
      from = Email.new(email: 'roy.kimathi@student.moringaschool.com')
      to = Email.new(email: email)
      subject = 'Welcome to Road Rescue Assistance'
      content = Content.new(type: 'text/plain', value: token)
      mail = Mail.new(from, subject, to, content)
      sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
      reponse  = sg.client.mail._('send').post(request_body: mail.to_json)    
    end
    # def get_location(latitude:,longitude:)
    #   api_key=ENV["GOOGLE_MAPS_API_KEY"]
    #   url = URI("https://maps.googleapis.com/maps/api/geocode/json?latlng=#{latitude},#{longitude}&key=#{api_key}")
    #   response = Net::HTTP.get(url)
    #   json = JSON.parse(response)
    #     if json["status"] === "OK"
    #         result = json["results"][0]
    #         puts (result["formatted_address"])
    #         street = result["formatted_address"].split(",").first.split(" ")[1]
    #         city = result["formatted_address"].split(",")[1]
    #         Location.create(user_id: user.id, street: street, city: city, latitude: latitude, longitude: longitude)
    #     else 
    #         puts "Reverse geocoding failed: #{json["status"]}" 
    #     end
    # end
end
