Rails.application.routes.draw do

  get "/admin_stat" => "tweets#admin_stat"
  get "/tweets/tweet_stat" => "tweets#tweet_stat"
  get "/moderator_updatestat" => "tweets#moderator_updatestat"
  get "/tweets/all_tweets" => "tweets#all_tweets"
  get "tweets/setStatus" => "tweets#set_status"
  get '/tweets/dashboard' => 'tweets#dashboard'
  get "/user_desg_set" => "users#user_desg_set"
  get "/users/allUsers" => "users#allUsers"
  get "/users/set_desg" => "users#set_desg"
  get "/moderatorview" => "tweets#moderatorview"
  get "/users/signin_func" => "users#signin_func"
  get "/users/check" => "users#check"
  get "/users/checkmail" => "users#checkmail"
  resources :tweets
  get 'users/usertweetsang' => 'users#usertweetsang'
  get 'usertweets' => 'users#usertweets'
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

end
