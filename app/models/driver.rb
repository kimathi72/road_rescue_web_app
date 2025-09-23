class Driver < User
  has_many :vehicles, foreign_key: :driver_id, dependent: :destroy
  has_many :requests, through: :vehicles
  has_many :invoices, through: :requests
  accepts_nested_attributes_for :vehicles
end
