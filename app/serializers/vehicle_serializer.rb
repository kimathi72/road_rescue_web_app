class VehicleSerializer < ActiveModel::Serializer
  attributes :id, :plate_number, :make, :model, :year
  belongs_to :user
  has_many :incidents
end
