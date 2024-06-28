class ServiceSerializer < ActiveModel::Serializer
  attributes :id, :title, :description 
  has_many :responders 
end
