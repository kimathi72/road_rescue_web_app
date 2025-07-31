class AddColumnsToLocations < ActiveRecord::Migration[7.0]
  def change
    add_column :locations, :place, :string
    add_column :locations, :district, :string
    add_column :locations, :region, :string
  end
end
