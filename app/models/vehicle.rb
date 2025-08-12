class Vehicle < ApplicationRecord
  belongs_to :user, dependent: :destroy

  has_many :requests, dependent: :destroy

  validates :user_id, presence: true
  validates :plate_number, uniqueness: { case_sensitive: false }
end
