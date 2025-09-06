class AddTotalToInvoices < ActiveRecord::Migration[7.0]
  def change
    add_column :invoices, :total, :float, default: 0.00
  end
end
