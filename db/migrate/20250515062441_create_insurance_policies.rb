class CreateInsurancePolicies < ActiveRecord::Migration[7.0]
  def change
    create_table :insurance_policies do |t|
      t.references :vehicle, null: false, foreign_key: true
      t.date :start_date
      t.date :end_date
      t.integer :coverage_type
      t.float :premium_amount
      t.integer :status

      t.timestamps
    end
  end
end
