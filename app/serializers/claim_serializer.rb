class ClaimSerializer < ActiveModel::Serializer
  attributes :id, :vehicle, :status, :approved_amount, :payout_date
end
