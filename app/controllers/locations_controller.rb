class LocationsController < ApplicationController
  before_action :authorized

  def index
    locations = Location.all.sort_by { |location| location["city"] }
    render json: locations, status: :ok
  end

  def create
    location = Location.create(location_params)
    render json: location, status: :created
  end

  private

  def location_params
    params.require(:location).permit(:latitude, :longitude, :city, :country)
  end
end
