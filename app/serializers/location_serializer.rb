class LocationSerializer < ActiveModel::Serializer
  attributes :id, :latitude, :longitude, :place, :district, :city, :region, :country
end
