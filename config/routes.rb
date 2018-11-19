Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  get 'home/index'
  get '/sobre', controller: "home", action: "about"

  # resources :stations, only: [:show]
  get '/stations/:id', to: 'stations#show', as: "station"
  get '/stations/:id/:sensor', to: 'stations#details'

  resources :statuses, only: [:create]

  root 'home#index'
end
