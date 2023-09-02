Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root 'pages#home'
  post '/results', to: 'results#api_call'
  get '/results', to: 'results#api_call'
  post '/results/regenerate_results', to: 'results#regenerate_results'
end
