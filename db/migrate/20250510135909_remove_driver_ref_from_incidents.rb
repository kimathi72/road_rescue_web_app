class RemoveDriverRefFromIncidents < ActiveRecord::Migration[7.0]
  def change
    remove_reference :incidents, :driver, null: false, foreign_key: true
  end
end
