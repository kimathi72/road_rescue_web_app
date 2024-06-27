class Request < ApplicationRecord
    belongs_to :driver 
    has_one :response 
    
end
