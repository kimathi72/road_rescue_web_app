Rails.application.routes.draw do
  resources :messages
  resources :incident_photos
  mount ActionCable.server => "/cable"

  resources :users
  resources :vehicles
  resources :notifications
  resources :locations
  resources :chats
  resources :requests
  resources :services
  resources :drivers
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  post "/auth", to: "auth#create"
  get "/request/:user_id", to: "requests#queue"
  get "/me", to: "users#me"
  delete "/logout", to: "auth#destroy"
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
