class Service < ApplicationRecord
    has_many :servicelists 
    has_many :responders , through: :servicelists 
end
