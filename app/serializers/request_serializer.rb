class RequestSerializer < ActiveModel::Serializer
  attributes :id, :service_name, :request_description, :rescue_provider_id, :status
  belongs_to :service
end
