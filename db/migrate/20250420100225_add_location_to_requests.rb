class AddLocationToRequests < ActiveRecord::Migration[7.0]
  def change
    add_reference :requests, :location, null: false, foreign_key: true
  end
end
