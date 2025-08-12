class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :role, :phone
  belongs_to :location
  has_many :vehicles
end
