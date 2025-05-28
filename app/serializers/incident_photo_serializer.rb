class IncidentPhotoSerializer < ActiveModel::Serializer
  attributes :id, :image_url, :incident_id
  belongs_to :incident
end
