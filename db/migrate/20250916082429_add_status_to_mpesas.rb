class AddStatusToMpesas < ActiveRecord::Migration[7.0]
  def change
    add_column :mpesas, :status, :integer, default: 0, null: false
  end
end
