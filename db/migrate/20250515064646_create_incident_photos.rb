class CreateIncidentPhotos < ActiveRecord::Migration[7.0]
  def change
    create_table :incident_photos do |t|
      t.references :incident, null: false, foreign_key: true
      t.text :image_url

      t.timestamps
    end
  end
end
