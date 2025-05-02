class AddRescueProviderRefToRequests < ActiveRecord::Migration[7.0]
  def change
    add_reference :requests, :rescue_provider, foreign_key: true, default: nil
  end
end
