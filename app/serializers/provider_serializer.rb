class ProviderSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone, :availability, :availability_status, :type, :location, :business_name, :license_info, :service_area, :rating_avg, :approved
  belongs_to :location
  has_many :requests
  has_many :services
end
