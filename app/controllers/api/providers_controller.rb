module Api
  class ProvidersController < ApplicationController
    before_action :set_provider, only: [:show, :update, :destroy]
    before_action :admin_authenticated, only: [:index, :update, :destroy]

    def index
      @providers = Provider.all
      render json: @providers, status: :ok
    end

    def create
      @provider = Provider.create(provider_params)
    end

    def show
      render json: @provider, status: :ok
    end

    def update
      puts @provider
      @provider.update(provider_params)
      render json: @provider, status: :ok
    end

    def destroy
      @provider.destroy
      render json: {}, status: :ok
    end

    private

    def set_provider
      @provider = Provider.find_by(id: params[:id])
      unless @provider
        render json: { error: "Provider not found" }, status: :not_found
      end
    end

    def provider_params
      params.require(:provider).permit(:availability, :location_id, :approved, :business_name, :license_info)
    end
  end
end
