class DriversController < ApplicationController
  before_action :set_driver, only: %i[ show update destroy ]
  before_action :authorized 
  # GET /drivers
  def index
    @drivers = Driver.all
    render json: @drivers, status: :found
  end

  # GET /drivers/1
  def show
    render json: @driver, status: :found
  end

  # POST /drivers
  def create
    if current_user.id === driver_params[:user_id] 
      @driver = Driver.create(driver_params)
      if @driver.valid?
        render json: @driver, status: :created
      else
        render json: @driver.errors, status: :unprocessable_entity
      end
    else 
      render json: { error: "You are not authorized to create a driver" }, status: :unauthorized
    end
  end

  # PATCH/PUT /drivers/1
  def update
    if current_user.id === driver_params[:user_id] | current_user.role === "admin"
    if @driver.update(driver_params)
      render json: @driver
    else
      render json: @driver.errors, status: :unprocessable_entity
    end
  else 
    render json: { error: "You are not authorized to update a driver" }, status: :unauthorized
  end
  end

  # DELETE /drivers/1
  def destroy
    @driver.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_driver
      @driver = Driver.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def driver_params
      params.require(:driver).permit(:user_id, :username, :photo_url)
    end
end
