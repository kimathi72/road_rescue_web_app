class ChatSerializer < ActiveModel::Serializer
  attributes :id
  has_one :request
  has_many :messages
end
