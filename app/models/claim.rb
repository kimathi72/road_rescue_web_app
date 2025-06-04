class Claim < ApplicationRecord
  belongs_to :incident
  has_one :assessment

  def vehicle
    self.incident.vehicle.plate_number
  end
end
