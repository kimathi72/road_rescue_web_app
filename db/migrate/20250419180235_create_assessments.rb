class CreateAssessments < ActiveRecord::Migration[7.0]
  def change
    create_table :assessments do |t|
      t.references :claim, null: false, foreign_key: true
      t.string :report_url
      t.float :estimated_cost

      t.timestamps
    end
  end
end
