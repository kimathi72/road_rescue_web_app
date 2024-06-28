class Request < ApplicationRecord
    belongs_to :driver 
    has_one :response 
    has_one :service 
    
end
