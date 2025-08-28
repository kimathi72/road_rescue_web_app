class CreateInvoices < ActiveRecord::Migration[7.0]
  def change
    create_table :invoices do |t|
      t.references :request, null: false, foreign_key: true
      t.float :total
      t.integer :status, default: 0

      t.timestamps
    end
  end
end
