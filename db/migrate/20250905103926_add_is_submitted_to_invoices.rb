class AddIsSubmittedToInvoices < ActiveRecord::Migration[7.0]
  def change
    add_column :invoices, :is_submitted, :boolean, default: false
  end
end
