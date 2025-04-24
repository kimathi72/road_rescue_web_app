require_relative "./users_controller.rb"

class DriversController < UsersController
  before_action :set_driver, only: {:show}
  def index
    drivers = Driver.all
    render json: drivers, status: :ok
  end

  def create
    @driver = Driver.create(driver_params)
    render json: @driver, status: :ok
  end
  def show
  render json: @driver, status: :ok
  end


  private

  def set_driver
    @driver = Driver.find(params[:id])
  end

  def driver_params
    params.require(:driver).permit(:insurance_id)
  end
end
