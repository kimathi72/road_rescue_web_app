class CreateDrivers < ActiveRecord::Migration[7.0]
  def change
    create_table :drivers do |t|
      t.integer :user_id
      t.string :username
      t.string :photo_url

      t.timestamps
    end
  end
end
