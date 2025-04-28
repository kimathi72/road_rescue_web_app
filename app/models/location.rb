class Location < ApplicationRecord
  has_many :requests
  has_many :rescue_providers
end
