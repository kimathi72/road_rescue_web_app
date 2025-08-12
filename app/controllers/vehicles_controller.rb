class VehiclesController < ApplicationController
  before_action :set_vehicle, only: %i[ show update destroy ]
  before_action :driver_authenticated, only: [:create]
  # GET /vehicles
  def index
    case current_user.role
    when "driver"
      @vehicles = User.find(current_user.id).vehicles
    else
      @vehicle = Vehicle.all
    end
    render json: @vehicles
  end

  # GET /vehicles/1
  def show
    render json: @vehicle
  end

  # POST /vehicles
  def create
    @vehicle = Vehicle.create(vehicle_params)
    render json: @vehicle, status: :created
  end

  # PATCH/PUT /vehicles/1
  def update
    @vehicle.update(vehicle_params)
    render json: @vehicle
  end

  # DELETE /vehicles/1
  def destroy
    @vehicle.destroy
    head :no_content
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_vehicle
    @vehicle = Vehicle.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def vehicle_params
    params.require(:vehicle).permit(:user_id, :plate_number, :make, :color, :model, :year)
  end
end
