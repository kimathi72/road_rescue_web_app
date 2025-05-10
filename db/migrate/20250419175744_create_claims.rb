class CreateClaims < ActiveRecord::Migration[7.0]
  def change
    create_table :claims do |t|
      t.integer :status
      t.float :approved_amount
      t.date :payout_date

      t.timestamps
    end
  end
end
