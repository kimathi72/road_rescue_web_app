class IncidentPhoto < ApplicationRecord
  belongs_to :incident

  def details
    Cloudinary::Api.resource(self[:public_id])
  end
end
