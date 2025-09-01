class AddAvailabilityToProviders < ActiveRecord::Migration[7.0]
  def change
    add_column :providers, :availability, :boolean, default: false, null: false
  end
end
