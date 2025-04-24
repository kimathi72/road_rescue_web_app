Rails.application.routes.draw do
  get "assessors/index"
  get "drivers/index"
  resources :notifications
  resources :assessments
  resources :claims
  resources :drivers

  resources :chats

  mount ActionCable.server => "/cable"

  #resources :reviews
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
