class Assessment < ApplicationRecord
  belongs_to :claim
  belongs_to :assessor
end
