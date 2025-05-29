class IncidentSerializer < ActiveModel::Serializer
  attributes :id, :date, :vehicle_plate, :city, :description, :status
  has_one :claim
  has_many :incident_photos
end
