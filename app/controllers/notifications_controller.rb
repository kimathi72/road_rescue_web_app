class NotificationsController < ApplicationController
  before_action :set_notification, only: %i[ show update destroy ]

  # GET /notifications
  def index
    @notifications = Notification.all

    render json: @notifications
  end

  # GET /notifications/1
  def show
    render json: @notification
  end

  # POST /notifications
  def create
    @notification = Notification.create(notification_params)
    render json: @notification, status: :created
  end

  # PATCH/PUT /notifications/1
  def update
    @notification.update(notification_params)
    render json: @notification
  end

  # DELETE /notifications/1
  def destroy
    @notification.destroy
    head :no_content
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_notification
    @notification = Notification.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def notification_params
    params.require(:notification).permit(:user_id, :request_id, :type, :message, :read_status)
  end
end
