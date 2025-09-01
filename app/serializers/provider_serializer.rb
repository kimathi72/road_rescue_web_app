class ProviderSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone, :availability_status, :type
  belongs_to :location
  has_many :requests
end
