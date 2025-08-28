class InvoiceItemSerializer < ActiveModel::Serializer
  attributes :id, :description, :charge
  has_one :invoice
end
