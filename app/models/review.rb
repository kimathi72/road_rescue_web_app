class Review < ApplicationRecord
    belongs_to :driver 
    belongs_to :response
end
