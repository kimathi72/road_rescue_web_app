require_relative "./user"

class RescueProvider < User
  has_many :requests
  has_many :services
  belongs_to :location
end
