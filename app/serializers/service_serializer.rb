class ServiceSerializer < ActiveModel::Serializer
  attributes :id, :title, :description 
  belongs_to :responder 
end
