class AddColumnsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :availability, :boolean, default: false, null: false
    add_column :users, :is_verified, :boolean, default: false, null: false
  end
end
