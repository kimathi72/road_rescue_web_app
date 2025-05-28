class IncidentSerializer < ActiveModel::Serializer
  attributes :id, :date, :vehicle_plate, :description, :police_report_url, :city, :photos_count, :status
end
