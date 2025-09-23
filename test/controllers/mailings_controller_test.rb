require "test_helper"

class MailingsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get mailings_create_url
    assert_response :success
  end
end
