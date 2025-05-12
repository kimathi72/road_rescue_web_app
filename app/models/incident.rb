class Incident < ApplicationRecord
  belongs_to :vehicle
  belongs_to :location
  has_one :claim
  has_one :driver, through: :vehicle
  has_many :incident_photos
  has_many :requests

  def photos
    self.incident_photos
  end
end
