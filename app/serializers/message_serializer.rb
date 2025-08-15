class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content
  has_one :chat
  has_one :user
end
