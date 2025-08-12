class VehicleSerializer < ActiveModel::Serializer
  attributes :id, :plate_number, :make, :color, :model, :year
  belongs_to :user
  has_many :requests
end
