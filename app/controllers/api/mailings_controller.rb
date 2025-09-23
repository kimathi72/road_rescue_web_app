module Api
  class MailingsController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def create
      puts params
      NotificationService.new.send_notification(
        to: "#{params[:notification][:to]}",
        subject: "#{params[:notification][:subject]}",
        html_content: "#{params[:notification][:html_content]}",
      )
      head :no_content
    end

    private

    def mailing_params
      params.require(:notification).permit(:to, :subject, :html_content)
    end
  end
end
