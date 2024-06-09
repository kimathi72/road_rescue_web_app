class DriverSerializer < ActiveModel::Serializer
  attributes :id, :email, :phone, :vehicle_id, :location_id
end
