class Invoice < ApplicationRecord
  belongs_to :request, optional: true
  has_many :invoice_items
  accepts_nested_attributes_for :invoice_items
  enum :status, {
    :unpaid => 0,
    :paid => 1,
    :overdue => 2,
  }
end
