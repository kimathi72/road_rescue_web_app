class DriverSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone, :type
  has_many :vehicles
  has_many :requests, through: :vehicle
end
