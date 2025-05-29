class Request < ApplicationRecord
  belongs_to :service
  belongs_to :user
  belongs_to :vehicle
  has_many :notifications
  # validates :user_is_provider
  enum status: ["reported", "pending", "resolved"]

  def service_type
    self.service[:name]
  end

  def vehicle_plate
    self.vehicle.plate_number
  end

  def provider_name
    self.user.name
  end

  def city
    self.location.city
  end

  def request_location
    self.location[:city]
  end

  # private

  # def user_is_provider
  #   errors.add(:user, "user must be provider") unless self.user.role == "provider"
  # end
end
