class Vehicle < ApplicationRecord
  belongs_to :driver
  belongs_to :insurance_policy
  has_many :incidents
  has_many :claims, through: :incidents
end
