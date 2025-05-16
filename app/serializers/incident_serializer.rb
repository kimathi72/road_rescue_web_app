class IncidentSerializer < ActiveModel::Serializer
  attributes :id, :date_happened, :description, :police_report, :photos
  belongs_to :vehicle
  belongs_to :location
  has_many :requests
  has_many :claims
  has_many :incident_photos
end
