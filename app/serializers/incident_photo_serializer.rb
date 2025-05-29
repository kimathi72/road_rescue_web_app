class IncidentPhotoSerializer < ActiveModel::Serializer
  attributes :id, :details
  belongs_to :incident
end
