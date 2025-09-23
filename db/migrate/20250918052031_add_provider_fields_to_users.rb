class AddProviderFieldsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :business_name, :string
    add_column :users, :license_info, :string
    add_column :users, :service_area, :text
    add_column :users, :rating_avg, :decimal, default: 0
    add_column :users, :approved, :boolean, default: false
    add_column :users, :availability, :boolean, default: false
  end
end
