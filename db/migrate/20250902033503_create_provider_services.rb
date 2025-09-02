class CreateProviderServices < ActiveRecord::Migration[7.0]
  def change
    create_table :provider_services do |t|
      t.references :provider, null: false, foreign_key: { to_table: :users }
      t.references :service, null: false, foreign_key: true

      t.timestamps
    end
  end
end
