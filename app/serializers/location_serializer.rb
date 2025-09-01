class LocationSerializer < ActiveModel::Serializer
  attributes :id, :latitude, :longitude, :district, :city
  has_many :providers
end
