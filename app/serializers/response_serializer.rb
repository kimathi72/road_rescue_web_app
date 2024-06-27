class ResponseSerializer < ActiveModel::Serializer
  attributes :id, :request_id, :responder_id, :status 
  has_one :request 
  belongs_to :responder 
  
end
