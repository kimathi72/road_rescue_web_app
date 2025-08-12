class LocationsController < ApplicationController
  skip_before_action :authorized, only: [:index]
  before_action :set_location, only: [:show]

  def index
    locations = Location.all.sort_by { |location| location["city"] }
    render json: locations, status: :ok
  end

  def show
    render json: @location, status: :ok
  end

  def create
    location = Location.create(location_params)
    render json: location, status: :created
  end

  private

  def set_location
    @location = Location.find(params[:id])
  end

  def location_params
    params.require(:location).permit(:latitude, :longitude, :city)
  end
end
