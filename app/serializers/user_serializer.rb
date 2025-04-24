class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :type, :phone
  has_one :location
end
