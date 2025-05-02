class Request < ApplicationRecord
  belongs_to :driver
  belongs_to :service
  belongs_to :location
  enum status: ["reported", "pending", "resolved"]

  def service_name
    self.service[:name]
  end

  def request_location
    self.location[:city]
  end
end
