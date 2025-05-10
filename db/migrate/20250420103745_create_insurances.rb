class CreateInsurances < ActiveRecord::Migration[7.0]
  def change
    create_table :insurances do |t|
      t.string :name

      t.timestamps
    end
  end
end
