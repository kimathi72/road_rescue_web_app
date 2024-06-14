class DriverSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :photo_url
end
