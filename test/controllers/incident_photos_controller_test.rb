require "test_helper"

class IncidentPhotosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @incident_photo = incident_photos(:one)
  end

  test "should get index" do
    get incident_photos_url, as: :json
    assert_response :success
  end

  test "should create incident_photo" do
    assert_difference("IncidentPhoto.count") do
      post incident_photos_url, params: { incident_photo: { image_url: @incident_photo.image_url, incident_id: @incident_photo.incident_id } }, as: :json
    end

    assert_response :created
  end

  test "should show incident_photo" do
    get incident_photo_url(@incident_photo), as: :json
    assert_response :success
  end

  test "should update incident_photo" do
    patch incident_photo_url(@incident_photo), params: { incident_photo: { image_url: @incident_photo.image_url, incident_id: @incident_photo.incident_id } }, as: :json
    assert_response :success
  end

  test "should destroy incident_photo" do
    assert_difference("IncidentPhoto.count", -1) do
      delete incident_photo_url(@incident_photo), as: :json
    end

    assert_response :no_content
  end
end
