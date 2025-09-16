class VehicleSerializer < ActiveModel::Serializer
  attributes :id, :plate_number, :make, :color, :model, :year, :created_at, :driver
end
