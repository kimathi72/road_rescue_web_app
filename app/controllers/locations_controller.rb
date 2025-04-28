class LocationsController < ApplicationController
  before_action :authorized

  def create
    location = Location.create(location_params)
    render json: @location, status: :created
  end

  private

  def location_params
    params.require(:location).permit(:latitude, :longitude, :city, :country)
  end
end
