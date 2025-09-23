class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at
  has_one :chat
  has_one :user
end
