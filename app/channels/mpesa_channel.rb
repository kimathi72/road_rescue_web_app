class MpesaChannel < ApplicationCable::Channel
  def subscribed
    stream_from "mpesa_#{params[:checkoutRequestID]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_all_streams
  end
end
