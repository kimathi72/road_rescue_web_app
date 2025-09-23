class InvoiceItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :description, :cost, :charge
end
