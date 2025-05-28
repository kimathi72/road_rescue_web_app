class Claim < ApplicationRecord
  belongs_to :incident
  has_one :assessment

  def vehicle
    self.incident.vehicle.plate_number
  end

  def assessor_name
    self.assessment.user.name
  end
end
