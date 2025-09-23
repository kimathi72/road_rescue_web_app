class RemoveChargeFromInvoiceItems < ActiveRecord::Migration[7.0]
  def change
    remove_column :invoice_items, :charge, :float
  end
end
