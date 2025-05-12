class VehicleSerializer < ActiveModel::Serializer
  attributes :id, :make, :model, :year
  has_one :driver
  has_one :insurance_policy
end
