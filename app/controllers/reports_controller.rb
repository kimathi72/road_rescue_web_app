class ReportsController < ApplicationController
  before_action :authorized

  def admin
    authorize_admin!

    requests = Request.all
    invoices = Invoice.includes(:request)
    services = Service.includes(:requests)

    render json: {
      revenue: invoices.group_by_month(:created_at).sum(:total_amount),
      requests: requests.group(:status).count,
      services: services.joins(:requests).group("services.name").count,
      outstanding_invoices: invoices.where(status: "unpaid"),
    }
  end

  # GET /api/reports/provider/:id
  def provider
    provider = Provider.find(params[:id])
    authorize_provider!(provider)

    requests = provider.requests
    invoices = provider.invoices

    render json: {
      revenue: invoices.group_by_month(:created_at).sum(:total_amount),
      requests: requests.group(:status).count,
      outstanding_invoices: invoices.where(status: "unpaid"),
    }
  end

  # GET /api/reports/driver/:id
  def driver
    driver = Driver.find(params[:id])
    authorize_driver!(driver)

    requests = driver.requests
    invoices = driver.invoices

    render json: {
      past_requests: requests.order(created_at: :desc).limit(10),
      invoices: invoices,
      reliability_score: driver.reliability_score,
    }
  end

  private

  def authorize_admin!
    render json: { error: "Not authorized" }, status: :forbidden unless current_user.admin?
  end

  def authorize_provider!(provider)
    render json: { error: "Not authorized" }, status: :forbidden unless current_user == provider.user || current_user.admin?
  end

  def authorize_driver!(driver)
    render json: { error: "Not authorized" }, status: :forbidden unless current_user == driver.user || current_user.admin?
  end
end
