class IncidentPhotoSerializer < ActiveModel::Serializer
  attributes :id, :image_url
  has_one :incident
end
