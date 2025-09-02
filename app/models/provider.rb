class Provider < User
  belongs_to :location, optional: true
  has_many :provider_services, foreign_key: :provider_id, dependent: :destroy
  has_many :services, through: :provider_services

  # after_create :create_location
  has_many :requests, foreign_key: :provider_id
  # accepts_nested_attributes_for :location
  def availability_status
    self[:availability] ? "Available" : "Unavailable"
  end
end
