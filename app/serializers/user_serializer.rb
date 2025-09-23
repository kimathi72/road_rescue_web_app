class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :type, :phone
end
