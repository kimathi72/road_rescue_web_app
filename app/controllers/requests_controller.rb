class RequestsController < ApplicationController
  before_action :set_request, only: [:show, :update, :destroy]
  before_action :driver_authenticated, only: [:create]

  def index
    if current_user.role == "driver"
      @requests = Driver.find(current_user["id"])
      render json: @requests
    else
      @requests = Request.all
      render json: @requests, status: :ok
    end
  end

  def show
    render @request, status: :ok
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
    params.require(:request).permit(:service_id, :location_id, :request_description, :rescue_provider_id, :status)
  end
end
