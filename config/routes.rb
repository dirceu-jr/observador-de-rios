Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  get 'home/index'
  get '/sobre', controller: "home", action: "about"
  get 'map', controller: "map", action: "index"
  root 'home#index'

  resources :stations, only: [:index, :show]
end
