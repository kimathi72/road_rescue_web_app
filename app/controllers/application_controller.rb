class ApplicationController < ActionController::API
  include ActionController::Cookies
  # require 'sendgrid-ruby'
  # include SendGrid
  # require 'net/http'
  # require 'uri'

  before_action :authorized
  before_action :cookie_set
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid_response
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def encode_token(payload)
    # should store secret in env variable
    JWT.encode(payload, "my_s3cr3t")
  end

  def auth_header
    # { Authorization: 'Bearer <token>' }
    request.headers["Authorization"]
  end

  def decoded_token
    if auth_header
      token = auth_header.split(" ")[1]
      # header: { 'Authorization': 'Bearer <token>' }
      begin
        JWT.decode(token, "my_s3cr3t", true, algorithm: "HS256")
      rescue JWT::DecodeError
        nil
      end
    end
  end

  def current_user
    if decoded_token
      user_id = decoded_token[0]["user_id"]
      @user = User.find_by(id: user_id)
    end
  end

  def logged_in?
    !!current_user
  end

  def driver_authenticated
    render json: { message: "Only authenticated driver allowed" }, status: :unauthorized unless current_user[:type] == "driver"
  end

  def admin_authenticated
    render json: { message: "Only authenticated admin allowed" }, status: :unauthorized unless current_user[:type] == "admin"
  end

  def provider_authenticated
    render json: { message: "Only authenticated assessor allowed" }, status: :unauthorized unless current_user[:type] == "provider"
  end

  def authorized
    render json: { message: "Please log in" }, status: :unauthorized unless logged_in?
  end

  def cookie_set
    @user = current_user
    return unless current_user
    cookies[:user_name] = @user.id
  end

  # def sendgrid_email (email:, token:)
  #   from = Email.new(email: 'roy.kimathi@student.moringaschool.com')
  #   to = Email.new(email: email)
  #   subject = 'Welcome to Road Rescue Assistance'
  #   content = Content.new(type: 'text/plain', value: token)
  #   mail = Mail.new(from, subject, to, content)
  #   sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
  #   response  = sg.client.mail._('send').post(request_body: mail.to_json)
  # end

  # api call to geolocation api to get city and country using coordinates
  # def get_location(latitude:, longitude:)
  #   url = URI("https://geocodeapi.p.rapidapi.com/GetNearestCities?latitude=#{latitude}&longitude=#{longitude}&range=0")

  #   http = Net::HTTP.new(url.host, url.port)
  #   http.use_ssl = true

  #   request = Net::HTTP::Get.new(url)
  #   request["x-rapidapi-key"] = '65b94cd137msh3e7b279435fc389p11f9d2jsn319c85beca2f'
  #   request["x-rapidapi-host"] = 'geocodeapi.p.rapidapi.com'

  #   response = http.request(request)
  #   result = JSON.parse(response.read_body)
  #   city_country = {city: result[0]["City"], country: result[0]["Country"]}
  #   city_country
  # end

  # api call to distance api to get distance between coordinates and return responders accordingly
  # def get_nearby_responders(latitude:, longitude:, responders:)
  #   responder_distances = Array.new
  #   nearby_responders = Array.new
  #   sorted_distances = Array.new
  #   responders.each do |responder|
  #     url = URI("https://geocodeapi.p.rapidapi.com/GetDistance?lat1=#{latitude}&lon1=#{longitude}&lat2=#{responder.location[:latitude]}&lon2=#{responder.location[:longitude]}")
  #     http = Net::HTTP.new(url.host, url.port)
  #     http.use_ssl = true
  #     request = Net::HTTP::Get.new(url)
  #     request["x-rapidapi-key"] = '65b94cd137msh3e7b279435fc389p11f9d2jsn319c85beca2f'
  #     request["x-rapidapi-host"] = 'geocodeapi.p.rapidapi.com'
  #     response = http.request(request)
  #     result = JSON.parse(response.read_body)
  #     responder_distances.push({responder_id: responder.id, distance: result["DistanceInKm"]})
  #   end
  #   puts responder_distances
  #   sorted_distances = responder_distances.sort_by do |responder_distance|
  #     responder_distance[:distance]
  #   end
  #   sorted_distances.map do |responder_distance|
  #     nearby_responders.push(Responder.find_by(id: responder_distance[:responder_id]))
  #   end
  #   nearby_responders
  # end

  private

  def record_invalid_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def record_not_found(notfound)
    render json: { error: "#{notfound.model} not found" }, status: :not_found
  end

  def user_not_authorized
    render json: { errors: "You are not authorized to perform this action." }, status: :forbidden
  end
end
