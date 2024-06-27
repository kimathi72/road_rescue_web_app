class RequestSerializer < ActiveModel::Serializer
  attributes :id, :driver_id, :request_type, :request_description, :status 
  belongs_to :driver 
  has_one :response
  
  
end
