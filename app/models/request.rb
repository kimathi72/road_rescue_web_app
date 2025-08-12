class Request < ApplicationRecord
  belongs_to :service
  belongs_to :vehicle
  belongs_to :user, optional: true
  belongs_to :location, optional: true
  has_many :notifications
  accepts_nested_attributes_for :location
  # validates :user_is_provider
  enum :status, {
         :reported => 0,
         :accepted => 1,
         :resolved => 2,
         :cancelled => 3,
       }
end
