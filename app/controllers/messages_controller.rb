class MessagesController < ApplicationController
  before_action :set_message, only: %i[ show update destroy ]

  # GET /messages
  def index
    if params[:chat_id]
      @chat = Chat.find(params[:chat_id])
      @messages = @chat.messages
    else
      @messages = Message.all
    end

    render json: @messages, status: :ok
  end

  # GET /messages/1
  def show
    render json: @message
  end

  # POST /messages
  def create
    @user = current_user
    @message = @user.messages.create(message_params)
    serialized_message = @message.serialize
    ActionCable.server.broadcast("chat_#{@message.chat.id}", serialized_message)
    render json: @message, status: :created
  end

  # PATCH/PUT /messages/1
  def update
    if @message.update(message_params)
      render json: @message
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  # DELETE /messages/1
  def destroy
    @message.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_message
    @message = Message.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def message_params
    params.require(:message).permit(:chat_id, :user_id, :content)
  end
end
