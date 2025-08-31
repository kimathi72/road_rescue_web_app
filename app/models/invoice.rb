class Invoice < ApplicationRecord
  belongs_to :request, optional: true
  has_many :invoice_items
  accepts_nested_attributes_for :invoice_items
  enum :status, {
    :unpaid => 0,
    :paid => 1,
    :overdue => 2,
  }

  def total
    invoice_items = self.invoice_items
    total_cost = invoice_items.map { |n| n.charge }
    total_cost.inject(0, :+)
  end
end
