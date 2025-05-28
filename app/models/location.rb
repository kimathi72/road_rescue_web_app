class Location < ApplicationRecord
  has_many :requests
  has_many :users

  # def providers
  #   User.select { |user| user.role == "provider" && user.location_id == self.id }
  # end

  validates :city, presence: true, uniqueness: { case_sensitive: false }
end
