class ProviderService < ApplicationRecord
  belongs_to :provider, class_name: "Provider"
  belongs_to :service
end
