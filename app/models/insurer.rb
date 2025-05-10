require_relative "./user"

class Insurer < User
  belongs_to :insurance
end
