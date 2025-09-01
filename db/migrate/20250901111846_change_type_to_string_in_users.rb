class ChangeTypeToStringInUsers < ActiveRecord::Migration[7.0]
  def change
    change_column :users, :type, :string
  end
end
