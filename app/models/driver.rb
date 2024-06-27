class Driver < ApplicationRecord
    belongs_to :user 
    has_many :requests 
    validates :username, uniqueness: {case_sensitive: false}  
    has_one :location, through: :user
    has_one :vehicle, through: :user 
    
end
