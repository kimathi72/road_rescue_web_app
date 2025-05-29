class IncidentSummarySerializer < ActiveModel::Serializer
  attributes :id, :date, :description

  # def summary
  #   { "date" => self.object.date,
  #     "vehicle" => self.object.vehicle_plate,
  #     "description" => self.object.description,
  #     "police_report" => self.object.police_report_url,
  #     "city" => self.object.city,
  #     "photos" => self.object.photos_count,
  #     "status" => self.object.status }
  # end
end
