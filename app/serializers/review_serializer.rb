class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :driver_id, :remark, :rating, :response_id 
  belongs_to :response 
end
