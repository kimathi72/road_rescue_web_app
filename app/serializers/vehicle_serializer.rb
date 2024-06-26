class VehicleSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :vehicle_reg
  belongs_to :user
end
