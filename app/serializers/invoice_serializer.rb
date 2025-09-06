class InvoiceSerializer < ActiveModel::Serializer
  attributes :id, :total, :status, :is_submitted, :created_at
  belongs_to :request
  has_many :invoice_items
end
