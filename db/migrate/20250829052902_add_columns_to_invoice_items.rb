class AddColumnsToInvoiceItems < ActiveRecord::Migration[7.0]
  def change
    add_column :invoice_items, :cost, :float
    add_column :invoice_items, :quantity, :integer
  end
end
