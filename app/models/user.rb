class User < ApplicationRecord
    has_secure_password
    validates :username
    validates :email, uniqueness: {case_sensitive: false} 
end
