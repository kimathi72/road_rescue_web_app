class Mpesa < ApplicationRecord
  belongs_to :invoice
  before_create :set_amount_from_invoice
  validates :invoice_id, presence: true
  validates :checkoutRequestID, presence: true, uniqueness: true
  validates :amount, presence: true, numericality: { greater_than: 0 }
  enum :status, {
         :pending => 0,
         :completed => 1,
         :failed => 2,
         :cancelled => 3,
       }

  private

  def set_amount_from_invoice
    self.amount = invoice.total if invoice.present?
  end
end
