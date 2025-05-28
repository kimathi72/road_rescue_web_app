class AssessmentsController < ApplicationController
  before_action :set_assessment, only: %i[ show update destroy ]
  before_action :assessor_authenticated, only: [:update, :delete]
  # GET /assessments
  def index
    case current_user.role
    when "driver"
      @assessments = User.find(current_user[:id]).claims.assessments
    when "assessor"
      @assessments = Assessment.select { |assessment| assessment.user_id == current_user.id }
    else
      @assessments = Assessment.all
    end
    render json: @assessments
  end

  # GET /assessments/1
  def show
    render json: @assessment, include: :claim, status: :ok
  end

  # POST /assessments
  def create
    @assessment = Assessment.new(assessment_params)

    if @assessment.save
      render json: @assessment, status: :created, location: @assessment
    else
      render json: @assessment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /assessments/1
  def update
    if @assessment.update(assessment_params)
      render json: @assessment
    else
      render json: @assessment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /assessments/1
  def destroy
    @assessment.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_assessment
    @assessment = Assessment.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def assessment_params
    params.require(:assessment).permit(:claim_id, :assessor_id, :report_url, :estimated_cost)
  end
end
