class Incident < ApplicationRecord
  belongs_to :vehicle
  belongs_to :location
  has_many :requests
  has_many :claims
  has_many :incident_photos

  def photos
    self.incident_photos
  end
end
