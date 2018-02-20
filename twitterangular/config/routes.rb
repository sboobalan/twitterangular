Rails.application.routes.draw do

  get "/moderator_updatestat" => "tweets#moderator_updatestat"
  get "/tweets/all_tweets" => "tweets#all_tweets"
  post "tweets/setStatus" => "tweets#set_status"

  resources :tweets
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
