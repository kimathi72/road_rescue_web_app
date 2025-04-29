class RemoveLocationRefFromRescueProviders < ActiveRecord::Migration[7.0]
  def change
    remove_reference :rescue_providers, :location, null: false, foreign_key: true
  end
end
