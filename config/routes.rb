Rails.application.routes.draw do
  resources :mpesas
  mount ActionCable.server => "/cable"

  namespace :api do
    resources :admins
    resources :invoices do
      resources :invoice_items, only: [:index]
    end
    resources :invoice_items
    resources :incident_photos

    resources :users do
      resources :requests, only: [:index], controller: "requests"
      resources :chats, only: [:index, :show], controller: "chats"
    end

    resources :chats do
      resources :messages, only: [:index, :show], controller: "messages"
    end
    resources :messages

    resources :services

    resources :locations do
      resources :providers, only: [:index, :show]
    end
    resources :providers
    resources :drivers do
      resources :vehicles, only: [:index, :show]
    end
    resources :vehicles do
      resources :requests, only: [:index, :show]
    end
    resources :requests do
      resources :locations, controller: "locations"
    end
    resources :reports
    resources :mailings, only: [:create]
    # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
    post "/auth", to: "auth#create"
    post "/mailings", to: "mailings#create"
    get "/request/:user_id", to: "requests#queue"
    get "/me", to: "users#me"
    delete "/logout", to: "auth#destroy"
    get "/city_requests", to: "requests#requests_grouped_by_cities"
    post "stkpush", to: "mpesas#stkpush"
    post "stkquery", to: "mpesas#stkquery"
    post "/callback_url", to: "mpesas#stkreceive"
  end
  # get "/reports/provider/:id", to: "reports#provider"
  # get "/reports/driver/:id", to: "reports#driver"
  # get "/reports", to: "reports#admin"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
