class Insurance < ApplicationRecord
  has_many :assessors
  has_many :claims
  has_many :insurers
end
