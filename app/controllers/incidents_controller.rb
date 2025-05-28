class IncidentsController < ApplicationController
  before_action :set_incident, only: %i[ show update destroy ]
  before_action :driver_authenticated, only: [:create]
  # GET /incidents
  def index
    case current_user.role
    when "driver"
      @incidents = User.find(current_user["id"]).incidents
    else
      @incidents = Incident.all
    end
    render json: @incidents, status: :ok
  end

  # GET /incidents/1
  def show
    render json: @incident, include: [:vehicle, :location, :claim, :incident_photos], status: :ok
  end

  # POST /incidents
  def create
    @incident = Incident.create(incident_params)
    serialized_incident = @incident.serialize
    puts serialized_incident
    ActionCable.server.broadcast("incident_channel", serialized_incident)
    render json: @incident, status: :created
  end

  # PATCH/PUT /incidents/1
  def update
    @incident.update(incident_params)
    render json: @incident, include: [:vehicle, :location, :claim, :incident_photos], status: :ok
  end

  # DELETE /incidents/1
  def destroy
    @incident.destroy
    head :no_content
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_incident
    @incident = Incident.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def incident_params
    params.require(:incident).permit(:vehicle_id, :location_id, :date_happened, :description, :police_report_url, :status)
  end
end
