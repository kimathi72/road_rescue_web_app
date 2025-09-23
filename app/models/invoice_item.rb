class InvoiceItem < ApplicationRecord
  belongs_to :invoice

  def charge
    self.cost.to_f * self.quantity.to_i
  end

  def serialize
    serialized_invoice_item = ActiveModelSerializers::Adapter::Json.new(
      InvoiceItemSerializer.new(self)
    ).serializable_hash
    serialized_invoice_item[:invoice_item]
  end
end
