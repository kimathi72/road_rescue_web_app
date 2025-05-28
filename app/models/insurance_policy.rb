class InsurancePolicy < ApplicationRecord
  belongs_to :vehicle
  enum coverage_type: { "individual": 0, "comprehensive": 1, "third-party": 2 }
  enum status: { "active": 0, "expired": 1 }
end
