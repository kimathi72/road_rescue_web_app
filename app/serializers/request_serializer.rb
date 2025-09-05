class RequestSerializer < ActiveModel::Serializer
  attributes :id, :request_description, :status, :provider_id, :created_at
  belongs_to :vehicle
  belongs_to :service
  belongs_to :location
  belongs_to :provider
  has_one :chat
  has_one :invoice
end
