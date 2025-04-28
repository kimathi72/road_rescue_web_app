class Service < ApplicationRecord
  has_many :requests
  validates :name, presence: true, uniqueness: true
end
