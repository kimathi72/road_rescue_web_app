class RequestSerializer < ActiveModel::Serializer
  attributes :id, :driver_id, :service_id, :request_description, :status 
  belongs_to :driver 
  has_one :response
  has_one :service
  
  
end
