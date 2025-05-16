class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :role, :phone

  has_many :vehicles
  has_many :incidents
  has_many :claims
  has_many :requests
  has_many :notifications
end
