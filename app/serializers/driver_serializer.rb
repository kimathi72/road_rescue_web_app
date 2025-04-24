require_relative "./user_serializer.rb"

class DriverSerializer < UserSerializer
  has_many :requests
end
