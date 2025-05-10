class AddLocationRefToUsers < ActiveRecord::Migration[7.0]
  def change
    add_reference :users, :location, foreign_key: true
  end
end
