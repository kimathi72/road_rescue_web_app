class LocationSerializer < ActiveModel::Serializer
  attributes :id, :latitude, :longitude, :city, :country, :user_id
  belongs_to :user
end
