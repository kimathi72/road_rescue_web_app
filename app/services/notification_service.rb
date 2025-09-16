require "brevo"

class NotificationService
  def initialize
    Brevo.configure do |config|
      config.api_key["api-key"] = ENV["BREVO_API_KEY"]
    end
    @api = Brevo::TransactionalEmailsApi.new
  end

  # Reusable method to send emails
  # @param to [String, Array<String>] Receiver email(s)
  # @param subject [String] Email subject
  # @param html_content [String] HTML body
  # @param from_email [String] Sender email (default: no-reply)
  # @param from_name [String] Sender name (default: "Your App")
  def send_notification(to:, subject:, html_content:, from_email: "kimathiwaweru@gmail.com", from_name: "Road Rescue App")
    recipients = Array(to).map { |email| { email: email } }

    email = Brevo::SendSmtpEmail.new(
      sender: { email: from_email, name: from_name },
      to: recipients,
      subject: subject,
      html_content: html_content,
    )

    begin
      result = @api.send_transac_email(email)
      Rails.logger.info("Email sent: #{result.to_json}")
      result
    rescue Brevo::ApiError => e
      Rails.logger.error("Failed to send email: #{e.message}")
      raise
    end
  end
end
