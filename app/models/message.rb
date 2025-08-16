class Message < ApplicationRecord
  belongs_to :chat
  belongs_to :user

  def serialize
    serialized_message = ActiveModelSerializers::Adapter::Json.new(
      MessageSerializer.new(self)
    ).serializable_hash
    serialized_message[:message]
  end
end
