class ServicesController < ApplicationController
    before_action :set_service, only: [:show, :update, :destroy]
    def index 
        services = Service.all
        render json: services, status: :found 
    end
    def show 
        render json: @service, include: [:responders] ,status: :found 
    end
    def create 
        if !current_user.role === 'admin' 
            render json: {error: "not permited"}, status: :unauthorized
        else
            service =Service.create(service_params)
            render json: service, status: :created 
        end
    end
    def update 
        @service.update(service_params)
        render json: @service, status: :updated
    end 
    def destroy 
        @service.destroy 
        render json: {}
    end 
    private 
    def set_service 
        @service = Service.find(params[:id])
    end
    def service_params 
        params.require(:service).permit(:title, :description )
    end
end
