class Assessment < ApplicationRecord
  belongs_to :claim
  belongs_to :user
  validates :user_is_assessor

  def user_is_assessor
    errors.add(:user, "user must be assessor") unless self.user.role == "assessor"
  end
end
