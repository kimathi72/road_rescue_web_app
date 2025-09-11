module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      # I personally used Rails' session hash to identify the current user.
      # There are a number of other ways to do this
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      token = request.params[:token]
      payload = JWT.decode(token, "my_s3cr3t", true, algorithm: "HS256")[0]
      User.find(payload["user_id"])
    rescue
      reject_unauthorized_connection
    end
  end
end
