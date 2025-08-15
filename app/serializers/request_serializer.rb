class RequestSerializer < ActiveModel::Serializer
  attributes :id, :request_description, :status, :updated_at, :created_at
  belongs_to :vehicle
  belongs_to :service
  belongs_to :location
  belongs_to :user
  has_one :chat
end
