class ApplicationController < ActionController::API
    include ActionController::Cookies
    require 'sendgrid-ruby'
    include SendGrid
    require 'net/http'
    require 'uri'
   
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
      response  = sg.client.mail._('send').post(request_body: mail.to_json)    
    end
    def get_location(latitude:, longitude:)
      url = URI("https://geocodeapi.p.rapidapi.com/GetNearestCities?latitude=#{latitude}&longitude=#{longitude}&range=0")

      http = Net::HTTP.new(url.host, url.port)
      http.use_ssl = true

      request = Net::HTTP::Get.new(url)
      request["x-rapidapi-key"] = '7f689d933cmshd1f74d015bfa401p106de2jsne64c2d046480'
      request["x-rapidapi-host"] = 'geocodeapi.p.rapidapi.com'

      response = http.request(request)
      result = JSON.parse(response.read_body)
      city_country = {city: result[0]["City"], country: result[0]["Country"]}
      city_country 
    end
    
end
