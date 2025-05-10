class CreateInsurers < ActiveRecord::Migration[7.0]
  def change
    create_table :insurers do |t|
      t.timestamps
    end
  end
end
