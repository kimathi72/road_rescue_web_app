class RemoveTitleFromServices < ActiveRecord::Migration[7.0]
  def change
    remove_column :services, :title, :string
  end
end
