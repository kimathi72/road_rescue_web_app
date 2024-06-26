class VehiclesController < ApplicationController
    before_action :set_vehicle, only: [:show]
    def index
        render json: Vehicle.all, status: :found
    end
    def show
        render json: vehicle, status: :found
    end
    def create 
        vehicle = Vehicle.create(vehicle_params)
        render json: vehicle, status: :success
    end
    private 
    def set_vehicle
        vehicle = Vehicle.find(params[:id])
    end
    def vehicle_params
        params.require(:vehicle).permit(:user_id, :vehicle_reg)
    end
end
