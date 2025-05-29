class CreateIncidentAbstacts < ActiveRecord::Migration[7.0]
  def change
    create_table :incident_abstacts do |t|
      t.string :public_id
      t.references :incident, null: false, foreign_key: true

      t.timestamps
    end
  end
end
