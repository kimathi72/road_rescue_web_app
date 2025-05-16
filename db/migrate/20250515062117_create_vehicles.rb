class CreateVehicles < ActiveRecord::Migration[7.0]
  def change
    create_table :vehicles do |t|
      t.references :user, null: false, foreign_key: true
      t.string :make
      t.string :model
      t.string :year
      t.string :plate_number

      t.timestamps
    end
  end
end
