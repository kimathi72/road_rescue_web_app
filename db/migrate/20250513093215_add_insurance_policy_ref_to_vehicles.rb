class AddInsurancePolicyRefToVehicles < ActiveRecord::Migration[7.0]
  def change
    add_reference :vehicles, :insurance_policy, foreign_key: true
  end
end
