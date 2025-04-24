class ClaimSerializer < ActiveModel::Serializer
  attributes :id, :status, :approved_amount, :payout_date
  has_one :incident
  has_one :insurer
end
