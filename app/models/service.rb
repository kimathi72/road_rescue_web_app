class Service < ApplicationRecord
  has_many :requests
  has_many :provider_services
  validates :name, presence: true, uniqueness: true
end
