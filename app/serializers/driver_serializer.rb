require_relative "./user_serializer.rb"

class DriverSerializer < UserSerializer
  attributes :id
  has_many :vehicles
  has_many :incidents, through: :vehicles, dependent: :destroy
  has_many :claims, through: :incidents, dependent: :destroy
  has_many :requests, through: :incidents, dependent: :destroy
end
