class CreateDrivers < ActiveRecord::Migration[7.0]
  def change
    create_table :drivers do |t|
      t.string :email
      t.string :password_digest
      t.bigint :phone
      t.integer :vehicle_id
      t.integer :location_id
      

      t.timestamps
    end
  end
end
