class User < ApplicationRecord
  has_secure_password
  # belongs_to :location, optional: true

  # after_create :create_location
  # has_many :vehicles
  # has_many :requests
  has_many :messages
  has_many :chats, through: :messages
  # accepts_nested_attributes_for :location, :vehicles
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }
end
