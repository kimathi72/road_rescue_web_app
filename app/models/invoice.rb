class Invoice < ApplicationRecord
  belongs_to :request, optional: true
  has_many :invoice_items
  delegate :driver, :provider, to: :request
  before_commit :total
  accepts_nested_attributes_for :invoice_items
  enum :status, {
    :unpaid => 0,
    :paid => 1,
    :overdue => 2,
  }

  # def provider_id
  #   self.request.provider.id
  # end

  # def driver_id
  #   self.request.vehicle.driver.id
  # end

  def total
    invoice_items = self.invoice_items
    total_cost = invoice_items.map { |n| n.charge }
    self.update(total: total_cost.inject(0, :+))
    total_cost.inject(0, :+)
  end
end
