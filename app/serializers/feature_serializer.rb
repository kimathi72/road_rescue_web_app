class FeatureSerializer < ActiveModel::Serializer
  attributes :id, :title, :icon, :url, :description, :role
end
