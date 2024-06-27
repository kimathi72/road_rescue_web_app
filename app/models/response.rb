class Response < ApplicationRecord
    belongs_to :responder 
    has_one :request 
    has_one :review 

end
