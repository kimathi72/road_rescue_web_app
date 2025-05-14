Rails.application.routes.draw do
  mount ActionCable.server => "/cable"
  resources :drivers do
    resources :incidents, only: [:index]
    resources :claims, only: [:index]
    resources :requests, only: [:index]
    resources :vehciles, only: [:index, :create]
  end
  resources :incidents
  resources :vehicles
  resources :notifications
  resources :assessments
  resources :claims
  resources :locations
  resources :chats
  resources :reviews
  resources :requests
  resources :services
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get "/users", to: "users#index"
  patch "/users/:id", to: "users#update"
  post "/users", to: "users#create"
  post "/auth", to: "auth#create"
  get "/me", to: "users#me"
  delete "/logout", to: "auth#destroy"
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
