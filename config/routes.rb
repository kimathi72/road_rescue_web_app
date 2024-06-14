Rails.application.routes.draw do

        resources :features
        resources :chats

        mount ActionCable.server => '/cable'

        #resources :reviews
        resources :responders
        #resources :requests

        # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

        # Defines the root path route ("/")
        # root "articles#index"
        resources :drivers, only: [:create, :show] do 
          resources :requests 
        end 
        #resources :responders  do 
        #  resources :reviews, only: [:show, :index]
        #end
        resources :reviews, only: [:show, :index, :create]
        resources :requests , only: [:show, :index, :create, :update]
        resources :moderators 
        resources :locations
        resources :messages
        resources :services
        resources :admins 
        
      post  '/users', to: 'users#create'
        post '/auth', to: 'auth#create'
        
        get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
