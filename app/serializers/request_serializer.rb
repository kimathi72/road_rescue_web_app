class RequestSerializer < ActiveModel::Serializer
  attributes :id, :vehicle_plate, :service_type, :city, :request_description, :provider_name, :status
end
