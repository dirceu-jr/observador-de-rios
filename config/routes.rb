Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  get 'home/index'
  get '/sobre', controller: "home", action: "about"

  resources :stations, only: [:index, :show]
  resources :statuses, only: [:create]

  root 'home#index'
end
