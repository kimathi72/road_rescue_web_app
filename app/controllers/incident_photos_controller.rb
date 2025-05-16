class IncidentPhotosController < ApplicationController
  before_action :set_incident_photo, only: %i[ show update destroy ]

  # GET /incident_photos
  def index
    @incident_photos = IncidentPhoto.all

    render json: @incident_photos
  end

  # GET /incident_photos/1
  def show
    render json: @incident_photo
  end

  # POST /incident_photos
  def create
    @incident_photo = IncidentPhoto.new(incident_photo_params)

    if @incident_photo.save
      render json: @incident_photo, status: :created, location: @incident_photo
    else
      render json: @incident_photo.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /incident_photos/1
  def update
    if @incident_photo.update(incident_photo_params)
      render json: @incident_photo
    else
      render json: @incident_photo.errors, status: :unprocessable_entity
    end
  end

  # DELETE /incident_photos/1
  def destroy
    @incident_photo.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_incident_photo
      @incident_photo = IncidentPhoto.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def incident_photo_params
      params.require(:incident_photo).permit(:incident_id, :image_url)
    end
end
