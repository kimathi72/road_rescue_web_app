class DriversController < ApplicationController
  skip_before_action :authorized , only: [:create, :login]
  before_action :set_driver, only: %i[ show update destroy ]

  # GET /drivers
  def index
    @drivers = Driver.all

    render json: @drivers
  end

  # GET /drivers/1
  def show
    render json: @driver
  end

  # POST /drivers
  def create
    @driver = Driver.create(driver_params)

    if @driver.valid?
      @token = encode_token(@driver.id)
      session[:driver_id] = @driver.id 
      send_email = sendgrid_email(email: @driver.email, token: @token)
      puts send_email
      render json: {driver: DriverSerializer.new(@driver, jwt: @token)}, status: :created
    else
      render json: @driver.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /drivers/1
  def update
    if @driver.update(driver_params)
      render json: @driver
    else
      render json: @driver.errors, status: :unprocessable_entity
    end
  end

  # DELETE /drivers/1
  def destroy
    @driver.destroy
  end
  # Login Driver
  def login 
    @driver = Driver.find_by(email: driver_login_params[:email])
    if @driver && @driver.authenticate(driver_login_params[:password])
      token = encode_token({driver_id: @driver.id})
      session[:driver_id] = @driver.id 
      render json: {driver: DriverSerializer.new(@driver), jwt: token}, status: :accepted 
    else
      render json: {message: 'Invalid email or password' }, status: :unprocessable_entity
    end
  end
  #Logout Driver
  def logout 
    session.delete :driver_id 
    render json: {}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_driver
      @driver = Driver.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def driver_params
      params.require(:driver).permit(:email, :password, :password_confirmation, :phone, :vehicle_id, :location_id)
    end
    def driver_login_params 
      params.require(:driver).permit(:email, :password)
    end
end
