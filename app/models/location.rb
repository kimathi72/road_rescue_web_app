class Location < ApplicationRecord
  has_many :requests

  validates :city, presence: true, uniqueness: { case_sensitive: false }
end
