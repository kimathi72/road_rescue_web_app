class RequestsController < ApplicationController
  before_action :set_request, only: [:show, :update, :destroy]

  def index
    @user = current_user
    if @user.type == "Driver"
      @requests = Driver.find(@user.id).requests
      authorize @requests
      render json: @requests, status: :ok
    else
      @requests = Request.all
      authorize @requests
      render json: @requests, status: :ok
    end
  end

  def show
    authorize @request
    render @request, status: :ok
  end

  def create
    @request = Request.create(request_params)
    authorize @request
    render json: @request, status: :created
  end

  def update
    authorize @request
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
    params.require(:request).permit(:driver_id, :service_id, :request_description, :status)
  end
end
