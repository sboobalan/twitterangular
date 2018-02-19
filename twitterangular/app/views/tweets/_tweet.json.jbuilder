json.extract! tweet, :id, :username, :text, :status, :approvedby, :image, :created_at, :updated_at
json.url tweet_url(tweet, format: :json)
