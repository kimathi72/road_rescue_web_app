class RequestSerializer < ActiveModel::Serializer
  attributes :id, :service_name, :request_description, :rescue_provider_id, :status
  belongs_to :service
  belongs_to :incident
  has_many :notifications
end
