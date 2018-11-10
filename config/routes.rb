Rails.application.routes.draw do
  get 'home/index'
  get '/sobre', controller: "home", action: "about"
  get 'map', controller: "map", action: "index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#index'
end
