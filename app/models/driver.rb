require_relative "./user"

class Driver < User
  has_many :vehicles
  has_many :incidents, through: :vehicles, dependent: :destroy
end
