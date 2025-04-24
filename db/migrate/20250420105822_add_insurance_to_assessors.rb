class AddInsuranceToAssessors < ActiveRecord::Migration[7.0]
  def change
    add_reference :assessors, :insurance, null: false, foreign_key: true
  end
end
