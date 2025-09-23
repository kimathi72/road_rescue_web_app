class RequestChannel < ApplicationCable::Channel
  def subscribed
    stream_from "request_#{params[:request_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_all_streams
  end
end
