class User < ApplicationRecord
  has_secure_password
  belongs_to :location, optional: true
  accepts_nested_attributes_for :location
  after_create :create_location
  has_many :vehicles
  has_many :requests
  has_many :messages
  has_many :chats, through: :messages
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }
  enum :role, { :driver => 0, :admin => 1, :provider => 2 }
end
