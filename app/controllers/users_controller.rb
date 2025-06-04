class UsersController < ApplicationController
  skip_before_action :authorized, only: [:create]
  before_action :set_user, only: %i[ show update destroy ]
  # before_action :insurer_admin_authenticated, only: [:index]
  before_action :admin_authenticated, only: [:update]

  # GET /users
  def index
    case current_user.role
    when "insurer"
      @users = User.all.select { |user| user.role != "insurer" || user.role != "admin" }
    else
      @users = User.all
    end
    render json: @users, status: :ok
  end

  # GET /users/1
  def show
    render json: @user, status: :ok
  end

  def me
    render json: { user: UserSerializer.new(current_user) }, status: :ok
  end

  # POST /users
  def create
    puts(user_params)
    @user = User.create(user_params)
    @token = encode_token(user_id: @user.id)
    session[:user_id] = @user.id
    session[:user_role] = @user.role
    # send_email = sendgrid_email(email: @user.email, token: @token)
    render json: { user: UserSerializer.new(@user), jwt: @token }, status: :created
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
    render json: {}
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :role, :phone)
  end
end
