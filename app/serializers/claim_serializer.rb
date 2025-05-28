class ClaimSerializer < ActiveModel::Serializer
  attributes :id, :vehicle, :assessor_name, :status, :approved_amount, :payout_date
end
