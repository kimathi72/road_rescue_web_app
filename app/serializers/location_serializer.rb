class LocationSerializer < ActiveModel::Serializer
  attributes :id, :latitude, :longitude, :city, :country
  has_many :rescue_providers
  has_many :requests
end
