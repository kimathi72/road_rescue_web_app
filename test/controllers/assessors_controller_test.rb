require "test_helper"

class AssessorsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get assessors_index_url
    assert_response :success
  end
end
