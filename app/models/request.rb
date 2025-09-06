class Request < ApplicationRecord
  belongs_to :service
  belongs_to :vehicle
  belongs_to :provider, class_name: "Provider", optional: true
  belongs_to :location, optional: true
  has_many :notifications
  has_one :chat
  has_one :invoice
  accepts_nested_attributes_for :location, :chat, :invoice
  after_create :create_chat
  after_create :create_invoice
  after_create :create_location
  # validates :user_is_provider
  enum :status, {
         :reported => 0,
         :accepted => 1,
         :resolved => 2,
         :cancelled => 3,
       }

  def serialize
    serialized_request = ActiveModelSerializers::Adapter::Json.new(
      RequestSerializer.new(self)
    ).serializable_hash
    serialized_request[:request]
  end

  def driver_id
    self.vehicle.driver.id
  end

  def issue
    self.service.name
  end
end
