class InvoiceSerializer < ActiveModel::Serializer
  attributes :id, :total, :status
  belongs_to :request
  has_many :invoice_items
end
