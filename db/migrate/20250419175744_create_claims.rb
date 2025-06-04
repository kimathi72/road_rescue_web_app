class CreateClaims < ActiveRecord::Migration[7.0]
  def change
    create_table :claims do |t|
      t.integer :status, default: 0
      t.float :approved_amount, default: 0
      t.date :payout_date

      t.timestamps
    end
  end
end
