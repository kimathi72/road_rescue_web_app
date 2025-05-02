class RequestSerializer < ActiveModel::Serializer
  attributes :id, :driver_id, :service_name, :request_description, :request_location, :rescue_provider_id, :status
  belongs_to :driver
end
