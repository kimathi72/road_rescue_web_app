class Claim < ApplicationRecord
  belongs_to :incident
  belongs_to :assessor
  validates :incident, presence: true
end
