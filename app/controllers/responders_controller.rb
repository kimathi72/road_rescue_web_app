class RespondersController < ApplicationController
    before_action :authorized 
    before_action :set_responder, only: [:show, :update, :destroy]
    def index 
        responders = Responder.all
        if current_user.role === 'admin'
            render json: responders, status: :found
        elsif current_user.role === 'driver' 
            latitude = current_user.location[:latitude]
            longitude = current_user.location[:longitude]        
            responders = get_nearby_responders(latitude: latitude, longitude: longitude, responders: responders)
            render json: responders, status: :found 
        end        
    end 

    def show 
        render json: @responder, status: :found
    end

    def create 
        @responder = Responder.create(responder_params)
        render json: @responder, status: :created 
    end

    def update
        @responder.update(responder_params)
        render json: @responder, status: :updated
    end
    def destroy 
        @responder.destroy
        render json: {}
    end
    private 
    def set_responder 
        @responder = Responder.find(params[:id])
    end
    def responder_params 
        params.require(:responder).permit(:user_id, :name, :bio)
    end
    
end
