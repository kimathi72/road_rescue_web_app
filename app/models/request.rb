class Request < ApplicationRecord
  belongs_to :driver
  belongs_to :service
  belongs_to :rescue_provider
  belongs_to :location
  has_one :claim
end
