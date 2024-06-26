class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :role , :phone
  has_one :vehicle 
  has_one :location
  
end
