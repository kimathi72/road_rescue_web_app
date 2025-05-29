class IncidentAbstactSerializer < ActiveModel::Serializer
  attributes :id, :public_id
  has_one :incident
end
