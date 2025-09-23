class MpesaSerializer < ActiveModel::Serializer
  attributes :id, :phoneNumber, :amount, :checkoutRequestID, :merchantRequestID, :mpesaReceiptNumber, :invoice_id, :created_at, :updated_at
end
