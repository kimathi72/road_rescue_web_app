class Request < ApplicationRecord
  belongs_to :driver
  has_one :service
  has_one :claim
  belongs_to :rescue_provider
end
