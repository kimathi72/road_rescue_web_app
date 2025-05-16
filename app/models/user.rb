class User < ApplicationRecord
  has_secure_password

  has_many :vehicles
  has_many :incidents, through: :vehicles
  has_many :claims, through: :incidents
  has_many :requests, through: :incidents
  has_many :notifications, through: :requests
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }
  enum role: { "driver": 0, "admin": 1, "provider": 2, "insurer": 3, "assessor": 4 }
end
