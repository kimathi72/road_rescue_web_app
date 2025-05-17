class IncidentPhotoSerializer < ActiveModel::Serializer
  attributes :id, :image_url, :incident_id
  has_one :incident
end
