class ClaimSerializer < ActiveModel::Serializer
  attributes :id, :status, :approved_amount, :payout_date
  belongs_to :incident
  belongs_to :assessor
  validates :incident, presence: true
end
