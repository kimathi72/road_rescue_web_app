class RequestsController < ApplicationController
  before_action :set_request, only: [:show, :update, :destroy]
  before_action :driver_authenticated, only: [:create]

  def index
    case current_user.role
    when "driver"
      @requests = User.find(current_user["id"]).requests
    else
      @requests = Request.all
    end
    render json: @requests
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
    params.require(:request).permit(:incident_id, :service_id, :location_id, :request_description, :user_id, :status)
  end
end
