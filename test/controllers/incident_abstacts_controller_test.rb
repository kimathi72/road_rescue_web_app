require "test_helper"

class IncidentAbstactsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @incident_abstact = incident_abstacts(:one)
  end

  test "should get index" do
    get incident_abstacts_url, as: :json
    assert_response :success
  end

  test "should create incident_abstact" do
    assert_difference("IncidentAbstact.count") do
      post incident_abstacts_url, params: { incident_abstact: { incident_id: @incident_abstact.incident_id, public_id: @incident_abstact.public_id } }, as: :json
    end

    assert_response :created
  end

  test "should show incident_abstact" do
    get incident_abstact_url(@incident_abstact), as: :json
    assert_response :success
  end

  test "should update incident_abstact" do
    patch incident_abstact_url(@incident_abstact), params: { incident_abstact: { incident_id: @incident_abstact.incident_id, public_id: @incident_abstact.public_id } }, as: :json
    assert_response :success
  end

  test "should destroy incident_abstact" do
    assert_difference("IncidentAbstact.count", -1) do
      delete incident_abstact_url(@incident_abstact), as: :json
    end

    assert_response :no_content
  end
end
