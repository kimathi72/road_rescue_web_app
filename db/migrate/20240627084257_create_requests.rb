class CreateRequests < ActiveRecord::Migration[7.0]
  def change
    create_table :requests do |t|
      t.integer :service_id
      t.string :request_description
      t.integer :status
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
