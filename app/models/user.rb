class User < ApplicationRecord
  has_secure_password
  has_one :location
  has_many :notifications
  validates :email, presence: true, uniqueness: { case_sensitive: false }

  def is_driver?
    self.type == "Driver"
  end

  def is_admin?
    self.type == "Admin"
  end

  def is_assessor?
    self.type == "Assessor"
  end

  def is_insurer?
    self.type == "Insurer"
  end
end
