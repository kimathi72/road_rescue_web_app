class DriverSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :username, :photo_url
end
