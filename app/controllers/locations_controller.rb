class LocationsController < ApplicationController
    
    def create 
        location = Location.create(location_params)
        render json: location, status: :created 
    end
    private 
    def location_params 
        params.require(:location).permit(:user_id,:latitude, :longitude, :city, :country)
    end
end
