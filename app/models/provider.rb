class Provider < User
  belongs_to :location

  # after_create :create_location
  has_many :requests, foreign_key: :provider_id
  # accepts_nested_attributes_for :location
  def availability_status
    self[:availability] ? "Available" : "Unavailable"
  end
end
