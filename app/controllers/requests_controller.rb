class RequestsController < ApplicationController
  before_action :set_request, only: [:show, :update, :destroy]
  before_action :driver_authenticated, only: [:create]

  def index
    @requests = Request.all
    render json: @requests, status: :ok
  end

  def provider_requests
    @requests = User.find(current_user[:id]).requests
    render json: @requests, status: :ok
  end

  def driver_requests
    @requests = Request.select { |request| request[:vehicle][:user_id] == current_user.id }
    render json: @requests, status: :ok
  end

  def nearby_requests
    @requests = Request.filter { |request| request[:location][:city] == current_user[:location][:city] }
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
    render json: @request, status: :updated
  end

  def destroy
  end

  private

  def set_request
    @request = Request.find(params[:id])
  end

  def request_params
    params.require(:request).permit(:vehicle_id, :service_id, :user_id, :request_description, :status, location_attributes: [:city, :latitude, :longitude])
  end
end
