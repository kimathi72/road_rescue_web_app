class InsurancePolicySerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :coverage_type, :premium_amount, :status
  belongs_to :insurer
  belongs_to :vehicle
end
