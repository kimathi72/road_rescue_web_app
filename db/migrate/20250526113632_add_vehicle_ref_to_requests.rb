class AddVehicleRefToRequests < ActiveRecord::Migration[7.0]
  def change
    add_reference :requests, :vehicle, null: false, foreign_key: true
  end
end
