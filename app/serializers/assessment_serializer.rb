class AssessmentSerializer < ActiveModel::Serializer
  attributes :id, :report_url, :estimated_cost
  belongs_to :claim
  belongs_to :user
end
