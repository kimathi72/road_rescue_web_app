class CreateLocations < ActiveRecord::Migration[7.0]
  def change
    create_table :locations do |t|
      t.float :latitude
      t.float :longitude
      t.string :city
      t.string :country
      t.integer :user_id

      t.timestamps
    end
  end
end
