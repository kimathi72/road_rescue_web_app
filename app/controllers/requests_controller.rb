class RequestsController < ApplicationController
    before_action :set_request, only: [:show,:update, :destroy]
    def Index 
        if current_user.role === "admin"
            requests = Request.all 
            render json: requests, status: :found 
        elsif current_user.role === "driver"
            requests = current_user.driver.requests
            render json: requests, status: :found 
        elsif current_user.role === "responder"
            drivers = User.find_by(role: "driver").driver
            requests = get_nearby_responders(latitude: current_user.location[:latitude], longitude: current_user.location[:longitude], responders: drivers).requests
            render json: requests, status: :found 
        end
    end
    def show         
        if current_user.driver.id === @request.driver_id 
           render @request, status: :found  
        elsif
            render @request, include: [:driver],status: :found
        end
    end
    def create
        if !current_user.role === "responder" 
            request = Request.create(request_params)
            render json: request, status: :created 
        else 
            render json: {error: "#{current_user.role} role, not permited to create request"}, status: :unprocessable_entity
        end 
    end 
    def update 
        @request.update(request_params)
        render json: @request, status: :updated 
    end 
    def destroy 
    end 
    private 
    def set_request 
        @request = Request.find(params[:id])
    end
    def request_params 
        params.require(:request).permit(:driver_id, :request_type, :request_description, :status)
    end
end
