Rails.application.routes.draw do
  resources :invoices do
    resources :invoice_items, only: [:index]
  end
  resources :invoice_items
  resources :incident_photos
  mount ActionCable.server => "/cable"

  resources :users do
    resources :requests, only: [:index, :show]
    resources :locations, only: [:index, :show]
    resources :vehicles, only: [:index, :show]
  end
  resources :vehicles do
    resources :requests, only: [:index, :show]
  end
  resources :notifications
  resources :locations
  resources :chats do
    resources :messages, only: [:index, :show]
  end
  resources :messages
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
