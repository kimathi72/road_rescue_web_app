class RequestSerializer < ActiveModel::Serializer
  attributes :id, :incident_id, :service_id, :location_id, :request_description, :user_id, :status
  belongs_to :service
  belongs_to :incident
  has_many :notifications
end
