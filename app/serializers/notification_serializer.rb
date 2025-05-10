class NotificationSerializer < ActiveModel::Serializer
  attributes :id, :type, :message, :read_status
  has_one :user
  has_one :request
end
