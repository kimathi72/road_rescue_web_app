class AssessmentSerializer < ActiveModel::Serializer
  attributes :id, :report_url, :estimated_cost
  has_one :claim
  has_one :assessor
end
