require_relative "./user"

class Assessor < User
  has_many :assessments
  belongs_to :insurance
  validates :insurance, presence: true
end
