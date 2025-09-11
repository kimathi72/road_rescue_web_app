module Api
  class RequestsController < ApplicationController
    before_action :set_request, only: [:show, :update, :destroy]
    before_action :driver_authenticated, only: [:create]

    def index
      if params[:user_id]
        @type = User.find(params[:user_id]).type
        provider_requests unless @type != "Provider"
        driver_requests unless @type != "Driver"
      elsif current_user.type == "Admin"
        @requests = Request.all
      elsif current_user.type == "Provider"
        puts "provider"
        @provider_location = Provider.find(current_user.id).location.city
        @requests = Request.all.filter { |req| req.location.city == @provider_location && req.status == "reported" }
      elsif current_user.type == "Driver"
        driver_requests
      end
      puts @requests
      render json: @requests, status: :ok
    end

    def show
      render json: @request, status: :ok
    end

    def create
      @request = Request.create(request_params)
      render json: @request, status: :created
    end

    def update
      @request.update(request_params)
      serialized_request = @request.serialize
      ActionCable.server.broadcast("request_#{@request.id}", serialized_request)
      render json: @request, status: :ok
    end

    def destroy
    end

    private

    def set_request
      @request = Request.find(params[:id])
    end

    def request_params
      params.require(:request).permit(:vehicle_id, :service_id, :provider_id, :request_description, :status, location_attributes: [:city, :district, :latitude, :longitude], chat_attributes: [:chat_id], invoice_attributes: [:invoice_id, :total, :status])
    end

    def provider_requests
      @requests = Provider.find(params[:user_id]).requests
    end

    def driver_requests
      # @user = User.find(params[:user_id])
      # @vehicles = @user.vehicles
      # @requests = []
      # @vehicles.map { |vehicle| vehicle.requests.map { |request| @requests << request } }

      @requests = Driver.find(params[:user_id]).requests
      # @requests = @driver.requests
      # @requests = []
      # @vehicles.map { |vehicle| vehicle.requests.map { |request| @requests << request } }
    end

    def nearby_requests
      @requests = Request.filter { |request| request[:location][:city] == User.find(params[:user_id])[:location][:city] }
    end
  end
end
