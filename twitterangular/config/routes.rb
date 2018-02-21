Rails.application.routes.draw do
  get "/moderator_updatestat" => "tweets#moderator_updatestat"
  get "/tweets/all_tweets" => "tweets#all_tweets"
  post "tweets/setStatus" => "tweets#set_status"
  get '/tweets/dashboard' => 'tweets#dashboard'
  get "/users/signin_func" => "users#signin_func"
  get "/users/check" => "users#check"
  get "/users/checkmail" => "users#checkmail"
  resources :tweets
  get 'users/usertweetsang' => 'users#usertweetsang'
  get 'usertweets' => 'users#usertweets'
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

end
