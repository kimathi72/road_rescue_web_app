class Request < ApplicationRecord
  belongs_to :service
  belongs_to :incident
  has_many :notifications
  enum status: ["reported", "pending", "resolved"]

  def service_name
    self.service[:name]
  end

  def request_location
    self.location[:city]
  end
end
