class CreateFeatures < ActiveRecord::Migration[7.0]
  def change
    create_table :features do |t|
      t.string :title
      t.string :icon
      t.string :url
      t.string :description
      t.string :role

      t.timestamps
    end
  end
end
