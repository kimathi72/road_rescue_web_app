class CreateAssessors < ActiveRecord::Migration[7.0]
  def change
    create_table :assessors do |t|
      t.timestamps
    end
  end
end
