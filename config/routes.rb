Rails.application.routes.draw do
  resources :incident_photos
  mount ActionCable.server => "/cable"

  resources :users
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
  resources :drivers
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  post "/auth", to: "auth#create"
  get "/me", to: "users#me"
  delete "/logout", to: "auth#destroy"
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
