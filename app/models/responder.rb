class Responder < ApplicationRecord
    belongs_to :user 
    has_many :responses 
    has_one :location, through: :user 
    has_one :vehicle, through: :user  
    has_many :reviews
end
