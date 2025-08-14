class LocationSerializer < ActiveModel::Serializer
  attributes :id, :latitude, :longitude, :district, :city
end
