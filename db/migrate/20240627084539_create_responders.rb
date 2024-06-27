class CreateResponders < ActiveRecord::Migration[7.0]
  def change
    create_table :responders do |t|
      t.integer :user_id
      t.string :name
      t.string :bio
      t.string :status

      t.timestamps
    end
  end
end
