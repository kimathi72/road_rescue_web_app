class ClaimsController < ApplicationController
  before_action :set_claim, only: %i[ show update destroy ]
  before_action :insurer_authenticated, only: [:create]
  before_action :insurer_assessor_authenticated, only: [:update, :delete]
  # GET /claims
  def index
    case current_user.role
    when "driver"
      @claims = User.find(current_user["id"]).claims
    when "assessor"
      @claims = User.find(current_user["id"]).assessments.claims
    else
      @claims = Claim.all
    end
    render json: @claims
  end

  # GET /claims/1
  def show
    render json: @claim, include: [:incident, :assessment], status: :ok
  end

  # POST /claims
  def create
    @claim = Claim.create(claim_params)
    render json: @claim, status: :created
  end

  # PATCH/PUT /claims/1
  def update
    @claim.update(claim_params)
    render json: @claim
  end

  # DELETE /claims/1
  def destroy
    @claim.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_claim
    @claim = Claim.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def claim_params
    params.require(:claim).permit(:incident_id, :status, :approved_amount, :payout_date)
  end
end
