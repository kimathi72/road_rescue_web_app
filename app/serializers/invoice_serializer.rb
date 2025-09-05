class InvoiceSerializer < ActiveModel::Serializer
  attributes :id, :total, :status, :created_at
  belongs_to :request
  has_many :invoice_items
end
