class InsurancePolicy < ApplicationRecord
  belongs_to :vehicle
  belongs_to :insurer
end
