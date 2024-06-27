class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :role , :phone
  has_one :vehicle 
  has_one :location
  
end
