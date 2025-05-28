require "date"

class Incident < ApplicationRecord
  belongs_to :vehicle
  belongs_to :location
  has_one :claim
  has_many :incident_photos
  enum status: { "reported" => 0, "assessed" => 1, "resolved" => 2, "rejected" => 3 }

  def photos_count
    self.incident_photos.count
  end

  def vehicle_plate
    self.vehicle.plate_number
  end

  def city
    self.location.city
  end

  def date
    Date.parse(self.date_happened.to_s)
  end

  def serialize
    serialized_incident = ActiveModelSerializers::Adapter::Json.new(
      IncidentSerializer.new(self)
    ).serializable_hash
    serialized_incident[:incident]
  end
end
