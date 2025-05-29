class CreateIncidents < ActiveRecord::Migration[7.0]
  def change
    create_table :incidents do |t|
      t.references :vehicle, null: false, foreign_key: true
      t.references :location, null: false, foreign_key: true
      t.datetime :date_happened
      t.text :description
      t.text :police_report_url
      t.integer :status, default: 0

      t.timestamps
    end
  end
end
