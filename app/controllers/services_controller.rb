class ServicesController < ApplicationController
  before_action :set_service, only: [:show, :update, :destroy]
  skip_before_action :authorized, only: [:index]

  def index
    services = Service.all
    render json: services, status: :ok
  end

  def show
    render json: @service, include: [:rescue_providers], status: :ok
  end

  def create
    service = Service.create(service_params)
    render json: service, status: :created
  end

  def update
    @service.update(service_params)
    render json: @service, status: :ok
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
    params.require(:service).permit(:name)
  end
end
