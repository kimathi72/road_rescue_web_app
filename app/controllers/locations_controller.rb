class LocationsController < ApplicationController
   before_action :authorized 
    def create 
        if current_user.id === location_params[:user_id]
        @location = Location.create(location_params)
        city_country = get_location(latitude: @location.latitude, longitude: @location.longitude)
        @location.city = city_country[:city]
        @location.country = city_country[:country]
        render json: @location, status: :created 
        else 
            render json: {error: "Not valid user id"}, status: :unprocessable_entity
        end
    end
    def update 
        if  current_user.id === location_params[:user_id]
        @location = Location.find_by(user_id: location_params[:user_id])
        city_country = get_location(latitude: location_params[:latitude], longitude: location_params[:longitude])
        @location.update(latitude: location_params[:latitude], longitude: location_params[:longitude], city: city_country[:city], country: city_country[:country])
        render json: @location, status: :updated
        else 
            render json: {error: "Not a valid user id"}, status: :unprocessable_entity
        end  

    end
    private 
    def location_params 
        params.require(:location).permit(:user_id,:latitude, :longitude, :city, :country)
    end
end
