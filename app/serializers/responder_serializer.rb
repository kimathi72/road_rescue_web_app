class ResponderSerializer < ActiveModel::Serializer
  attributes :id, :name, :bio, :summary 
  has_many :responses 
  has_many :reviews 
  has_many :services 

  def summary 
  "#{self.object.bio[0..30]} ..."
  end
end
