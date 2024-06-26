class Vehicle < ApplicationRecord
    belongs_to :user
    validates :vehicle_reg, presence: true
end
