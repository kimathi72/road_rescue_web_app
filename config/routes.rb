Rails.application.routes.draw do
  resources :admins
  resources :invoices do
    resources :invoice_items, only: [:index]
  end
  resources :invoice_items
  resources :incident_photos
  mount ActionCable.server => "/cable"

  resources :users

  resources :notifications

  resources :chats do
    resources :messages, only: [:index, :show]
  end
  resources :messages

  resources :services

  resources :locations do
    resources :providers, only: [:index, :show]
  end
  resources :providers do
    resources :requests, only: [:index, :show]
  end
  resources :drivers do
    resources :vehicles, only: [:index, :show]
  end
  resources :vehicles do
    resources :requests, only: [:index, :show]
  end
  resources :requests
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  post "/auth", to: "auth#create"
  get "/request/:user_id", to: "requests#queue"
  get "/me", to: "users#me"
  delete "/logout", to: "auth#destroy"
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
