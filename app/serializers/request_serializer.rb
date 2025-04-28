class RequestSerializer < ActiveModel::Serializer
  attributes :id, :driver_id, :service_id, :request_description, :location_id, :status
  belongs_to :driver
  has_one :location
  has_one :service
end
