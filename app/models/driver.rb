require_relative "./user"

class Driver < User
  has_many :requests
  has_many :claims
end
