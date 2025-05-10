class Location < ApplicationRecord
  has_many :requests
  has_many :rescue_providers
  validates :city, presence: true, uniqueness: { case_sensitive: false }
end
