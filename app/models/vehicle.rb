class Vehicle < ApplicationRecord
  belongs_to :user
  has_many :incidents, dependent: :destroy
  has_one :insurance_policy
  validates :user_id, presence: true
  validates :plate_number, uniqueness: { case_sensitive: false }
  # validates :user_is_driver
  # private
  # def user_is_driver
  #   errors.add(:user, "user must be driver") unless user
  # end
end
