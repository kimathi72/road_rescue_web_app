class User < ApplicationRecord
  has_secure_password
  belongs_to :location, optional: true
  accepts_nested_attributes_for :location
  has_many :vehicles
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }
  enum :role, { :driver => 0, :admin => 1, :provider => 2 }
end
