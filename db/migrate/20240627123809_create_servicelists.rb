class CreateServicelists < ActiveRecord::Migration[7.0]
  def change
    create_table :servicelists do |t|
      t.integer :responder_id
      t.integer :service_id

      t.timestamps
    end
  end
end
