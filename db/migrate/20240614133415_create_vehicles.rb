class CreateVehicles < ActiveRecord::Migration[7.0]
  def change
    create_table :vehicles do |t|
      t.integer :user_id
      t.string :vehicle_reg

      t.timestamps
    end
  end
end
