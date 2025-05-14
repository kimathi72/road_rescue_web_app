require_relative "./user_serializer.rb"

class DriverSerializer < UserSerializer
  attributes :id
  has_many :vehicles
  has_many :incidents
end
