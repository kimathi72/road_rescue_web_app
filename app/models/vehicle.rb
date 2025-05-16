class Vehicle < ApplicationRecord
  belongs_to :user
  has_many :incidents, dependent: :destroy
  validates :user_id, presence: true
  validates :plate_number, uniqueness: { case_sensitive: false }
end
