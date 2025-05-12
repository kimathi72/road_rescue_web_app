class IncidentSerializer < ActiveModel::Serializer
  attributes :id, :date_happened, :description, :police_report, :photos
  belongs_to :vehicle
  belongs_to :location
  has_one :claim
  has_one :driver, through: :vehicle
end
