class RemoveTotalFromInvoices < ActiveRecord::Migration[7.0]
  def change
    remove_column :invoices, :total, :float
  end
end
