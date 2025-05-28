class AddUserRefToAssessments < ActiveRecord::Migration[7.0]
  def change
    add_reference :assessments, :user, foreign_key: true
  end
end
