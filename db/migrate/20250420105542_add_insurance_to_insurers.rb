class AddInsuranceToInsurers < ActiveRecord::Migration[7.0]
  def change
    add_reference :insurers, :insurance, null: false, foreign_key: true
  end
end
