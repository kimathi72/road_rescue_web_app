class Incident < ApplicationRecord
  belongs_to :vehicle
  belongs_to :location
  has_one :claim
  has_many :incident_photos

  def photos
    self.incident_photos
  end
end
