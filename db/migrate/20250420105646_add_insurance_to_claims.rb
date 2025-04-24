class AddInsuranceToClaims < ActiveRecord::Migration[7.0]
  def change
    add_reference :claims, :insurance, null: false, foreign_key: true
  end
end
