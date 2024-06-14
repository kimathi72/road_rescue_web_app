class UsersController < ApplicationController
  skip_before_action :authorized , only: [:create]
  before_action :set_user, only: %i[ show update destroy ]

  # GET /users
  def index
    @users = User.all

    render json: @users,  include: [:location, :driver, :responder] 
  end

  # GET /users/1
  def show
    render json: @user, include: [ :location, :driver, :responder] 
  end

  # POST /users
  def create
    puts(user_params)
    @user = User.create(user_params)
    
    if @user.valid?
      @token = encode_token(user_id: @user.id)
      session[:user_id] = @user.id
      send_email = sendgrid_email(email: @user.email, token: @token)
      render json: { user: UserSerializer.new(@user), jwt: @token }, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:username, :email, :password , :password_confirmation, :role)
    end
end
