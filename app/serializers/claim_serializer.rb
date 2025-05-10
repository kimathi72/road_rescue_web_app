class ClaimSerializer < ActiveModel::Serializer
  attributes :id, :status, :approved_amount, :payout_date
  belongs_to :request
  has_one :insurer
end
