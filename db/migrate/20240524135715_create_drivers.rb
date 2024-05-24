class CreateDrivers < ActiveRecord::Migration[7.0]
  def change
    create_table :drivers do |t|
      t.string :username
      t.string :password

      t.timestamps
    end
  end
end
