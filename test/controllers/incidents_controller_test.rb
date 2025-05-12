require "test_helper"

class IncidentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @incident = incidents(:one)
  end

  test "should get index" do
    get incidents_url, as: :json
    assert_response :success
  end

  test "should create incident" do
    assert_difference("Incident.count") do
      post incidents_url, params: { incident: { date_happened: @incident.date_happened, description: @incident.description, location_id: @incident.location_id, police_report: @incident.police_report, vehicle_id: @incident.vehicle_id } }, as: :json
    end

    assert_response :created
  end

  test "should show incident" do
    get incident_url(@incident), as: :json
    assert_response :success
  end

  test "should update incident" do
    patch incident_url(@incident), params: { incident: { date_happened: @incident.date_happened, description: @incident.description, location_id: @incident.location_id, police_report: @incident.police_report, vehicle_id: @incident.vehicle_id } }, as: :json
    assert_response :success
  end

  test "should destroy incident" do
    assert_difference("Incident.count", -1) do
      delete incident_url(@incident), as: :json
    end

    assert_response :no_content
  end
end
