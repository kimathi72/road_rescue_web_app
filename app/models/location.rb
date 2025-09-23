class Location < ApplicationRecord
  has_many :providers, foreign_key: :location_id
  has_many :requests
end
