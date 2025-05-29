class IncidentAbstactsController < ApplicationController
  before_action :set_incident_abstact, only: %i[ show update destroy ]

  # GET /incident_abstacts
  def index
    @incident_abstacts = IncidentAbstact.all

    render json: @incident_abstacts
  end

  # GET /incident_abstacts/1
  def show
    render json: @incident_abstact
  end

  # POST /incident_abstacts
  def create
    @incident_abstact = IncidentAbstact.new(incident_abstact_params)

    if @incident_abstact.save
      render json: @incident_abstact, status: :created, location: @incident_abstact
    else
      render json: @incident_abstact.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /incident_abstacts/1
  def update
    if @incident_abstact.update(incident_abstact_params)
      render json: @incident_abstact
    else
      render json: @incident_abstact.errors, status: :unprocessable_entity
    end
  end

  # DELETE /incident_abstacts/1
  def destroy
    @incident_abstact.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_incident_abstact
      @incident_abstact = IncidentAbstact.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def incident_abstact_params
      params.require(:incident_abstact).permit(:public_id, :incident_id)
    end
end
