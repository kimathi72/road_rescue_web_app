class InvoiceSerializer < ActiveModel::Serializer
  attributes :id, :total, :status, :is_submitted, :created_at, :request_id
  belongs_to :request
  has_many :invoice_items
end
