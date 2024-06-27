class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.integer :driver_id
      t.string :remark
      t.integer :rating
      t.integer :response_id

      t.timestamps
    end
  end
end
