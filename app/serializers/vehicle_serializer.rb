class VehicleSerializer < ActiveModel::Serializer
  attributes :id, :driver_id, :plate_number, :make, :model, :year
  belongs_to :driver
  belongs_to :insurance_policy
  has_many :incidents
end
