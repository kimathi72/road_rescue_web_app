class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :role, :phone
end
