class ProviderSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone, :availability, :availability_status, :type, :is_verified, :location
  belongs_to :location
  has_many :requests
  has_many :services
end
