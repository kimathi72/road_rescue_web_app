class VehicleSerializer < ActiveModel::Serializer
  attributes :id, :plate_number, :make, :color, :model, :year, :driver
end
