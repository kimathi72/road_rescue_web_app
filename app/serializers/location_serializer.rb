class LocationSerializer < ActiveModel::Serializer
  attributes :id, :latitude, :longitude, :city, :country
  has_many :requests
end
