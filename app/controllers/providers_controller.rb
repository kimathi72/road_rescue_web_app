class ProvidersController < ApplicationController
  def index
    @providers = Provider.all
    render json: @providers, status: :ok
  end

  def create
    @provider = Provider.create(:provider_params)
  end

  private

  def provider_params
    params.require(:provider).permit(:availability, :location_id)
  end
end
