class RemoveVehicleRefFromInsurancePolicies < ActiveRecord::Migration[7.0]
  def change
    remove_reference :insurance_policies, :vehicle, null: false, foreign_key: true
  end
end
