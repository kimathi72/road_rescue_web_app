class AddInsuranceToClaims < ActiveRecord::Migration[7.0]
  def change
    add_reference :claims, :insurance, default: 0, foreign_key: true
  end
end
