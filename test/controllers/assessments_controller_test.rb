require "test_helper"

class AssessmentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @assessment = assessments(:one)
  end

  test "should get index" do
    get assessments_url, as: :json
    assert_response :success
  end

  test "should create assessment" do
    assert_difference("Assessment.count") do
      post assessments_url, params: { assessment: { assessor_id: @assessment.assessor_id, claim_id: @assessment.claim_id, estimated_cost: @assessment.estimated_cost, report_url: @assessment.report_url } }, as: :json
    end

    assert_response :created
  end

  test "should show assessment" do
    get assessment_url(@assessment), as: :json
    assert_response :success
  end

  test "should update assessment" do
    patch assessment_url(@assessment), params: { assessment: { assessor_id: @assessment.assessor_id, claim_id: @assessment.claim_id, estimated_cost: @assessment.estimated_cost, report_url: @assessment.report_url } }, as: :json
    assert_response :success
  end

  test "should destroy assessment" do
    assert_difference("Assessment.count", -1) do
      delete assessment_url(@assessment), as: :json
    end

    assert_response :no_content
  end
end
