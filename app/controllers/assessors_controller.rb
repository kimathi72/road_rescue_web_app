class AssessorsController < ApplicationController
  def index
    @assessors = Assessor.all
    render json: @assessors, status: :ok
  end
end
