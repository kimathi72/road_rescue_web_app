class RequestsController < ApplicationController
  before_action :set_request, only: [:show, :update, :destroy]
  before_action :driver_authenticated, only: [:create]

  def index
    @requests = Request.all
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
    render json: @request, status: :updated
  end

  def destroy
  end

  def queue
    @user_role = User.find(params[:user_id]).role
    provider_requests unless @user_role != "provider"
    driver_requests unless @user_role != "driver"
    # requests = @requests.map { |request| Request.find(request[:request_id].to_i) }
    # render json: @requests, status: :ok
    puts @requests
    @requests.map { |request| render json: request }
  end

  private

  def set_request
    @request = Request.find(params[:id])
  end

  def request_params
    params.require(:request).permit(:vehicle_id, :service_id, :user_id, :request_description, :status, location_attributes: [:city, :latitude, :longitude])
  end

  def provider_requests
    @requests = Request.all.select { |request| request[:user_id].to_i == params[:user_id].to_i }
  end

  def driver_requests
    @user = User.find(params[:user_id])
    @vehicles = @user.vehicles
    @requests = @vehicles.map { |vehicle| vehicle.requests }
  end

  def nearby_requests
    @requests = Request.filter { |request| request[:location][:city] == User.find(params[:user_id])[:location][:city] }
  end
end
