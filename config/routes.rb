Rails.application.routes.draw do
  resources :drivers

  post '/driver_login', to: 'drivers#login'
  post 'driver_logout', to: 'drivers#logout'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
