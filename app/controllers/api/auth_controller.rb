module Api
  class AuthController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def create
      @user = User.find_by(email: user_login_params[:email])
      #User#authenticate comes from BCrypt
      if @user && @user.authenticate(user_login_params[:password])
        # encode token comes from ApplicationController
        token = encode_token({ user_id: @user.id })
        session[:user_id] = @user.id
        session[:user_type] = @user.type
        @user.update(availability: true) if @user.type == "Provider"

        render json: { user: UserSerializer.new(@user), jwt: token }, status: :accepted
      else
        render json: { message: "Invalid email or password" }, status: :unauthorized
      end
    end

    def destroy
      @user = current_user
      @user.update(availability: false) if @user.type == "Provider"
      session.delete :user_id
      session.delete :user_type
      head :no_content
    end

    private

    def user_login_params
      # params { user: {email: 'janedoe@domain.com', password: 'hi' } }
      params.require(:user).permit(:email, :password)
    end
  end
end
