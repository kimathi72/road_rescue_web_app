class RemoveDescriptionFromServices < ActiveRecord::Migration[7.0]
  def change
    remove_column :services, :description, :string
  end
end
