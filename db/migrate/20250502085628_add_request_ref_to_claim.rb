class AddRequestRefToClaim < ActiveRecord::Migration[7.0]
  def change
    add_reference :claims, :request, default: 0, foreign_key: true
  end
end
