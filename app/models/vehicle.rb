class Vehicle < ApplicationRecord
  belongs_to :driver, class_name: "Driver"

  has_many :requests, dependent: :destroy

  # validates :driver_id, presence: trues
  validates :plate_number, uniqueness: { case_sensitive: false }
end
