class ReviewsController < ApplicationController
    before_action :set_review, only: [:show, :update, :destroy]
    def index 
        responder = Responder.find_by(responder_id: review_params[:responder_id])
        reviews = responder.reviews 
        render json: reviews, status: :found    
    end
    def show 
        render json: @review, include: [:driver],status: :found 
    end 
    def create 
        if current_user.driver.id === review_params[:driver_id]
        review = Review.create(review_params)
        render json: review, include: [:response], status: :created
        end
    end 
    def update 
        @review.update(review_params)
        render json: @review, include: [:driver], status: :updated 
    end
    def destroy 
        @review.destroy 
        render json: {}
    end 
    private 
    def set_review 
        @review = Review.find(params[:id])
    end
    def review_params 
        params.require(:review).permit(:driver_id, :remark, :rating, :responder_id)
    end

end
