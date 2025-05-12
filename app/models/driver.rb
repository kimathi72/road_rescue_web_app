require_relative "./user"

class Driver < User
  has_many :vehicles
  has_many :incidents, through: :vehicles, dependent: :destroy
  has_many :claims, through: :incidents, dependent: :destroy
  has_many :requests, through: :incidents, dependent: :destroy
end
