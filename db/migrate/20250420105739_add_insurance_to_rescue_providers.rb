class AddInsuranceToRescueProviders < ActiveRecord::Migration[7.0]
  def change
    add_reference :rescue_providers, :insurance, foreign_key: true
  end
end
