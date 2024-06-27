class User < ApplicationRecord
    has_secure_password
    has_one :vehicle
    has_one :location
    validates :email, uniqueness: {case_sensitive: false} 
end
