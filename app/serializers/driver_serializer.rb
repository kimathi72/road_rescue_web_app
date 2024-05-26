class DriverSerializer < ActiveModel::Serializer
  attributes :id, :email, :password_digest, :phone, :vehicle_id, :location_id
end
