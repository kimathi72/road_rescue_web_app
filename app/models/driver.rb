class Driver < ApplicationRecord
    has_secure_password
    has_many :requests 
    has_one :vehicle 
    validates :email, presence: :true 
end
