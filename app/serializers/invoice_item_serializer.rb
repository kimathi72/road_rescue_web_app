class InvoiceItemSerializer < ActiveModel::Serializer
  attributes :id, :description, :charge
end
