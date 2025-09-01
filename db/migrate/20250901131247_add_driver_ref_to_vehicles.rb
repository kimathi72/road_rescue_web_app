class AddDriverRefToVehicles < ActiveRecord::Migration[7.0]
  def change
    add_reference :vehicles, :driver, null: false, foreign_key: { to_table: :users }
  end
end
