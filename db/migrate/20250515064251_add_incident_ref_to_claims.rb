class AddIncidentRefToClaims < ActiveRecord::Migration[7.0]
  def change
    add_reference :claims, :incident, null: false, foreign_key: true
  end
end
