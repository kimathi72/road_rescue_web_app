class User < ApplicationRecord
  has_secure_password
  has_many :notifications
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }
  enum role: { "driver": 0, "admin": 1, "assessor": 2, "insurer": 3 }
end
