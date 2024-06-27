class CreateResponses < ActiveRecord::Migration[7.0]
  def change
    create_table :responses do |t|
      t.integer :responder_id
      t.integer :request_id
      t.string :status

      t.timestamps
    end
  end
end
