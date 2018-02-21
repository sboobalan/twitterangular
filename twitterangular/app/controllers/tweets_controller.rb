class TweetsController < ApplicationController
  before_action :set_tweet, only: [:show, :edit, :update, :destroy]
  before_action :getusr, only: [:create]
  # GET /tweets
  # GET /tweets.json
  def index
    @tweets = Tweet.all
  end

  # GET /tweets/1
  # GET /tweets/1.json
  def show
  end

  def tweet_stat
    todate =  Date.today.to_s
    @tweets = Tweet.where("created_at like '" +todate +"%' and status like 'active'")
    if(!(@tweets.nil?))
      today_active = @tweets.length
    else
      today_active = 0
    end
    @tweets = Tweet.where("created_at like '" +todate +"%' and status like 'inactive'")
    if(!(@tweets.nil?))
      today_inactive = @tweets.length
    else
      today_inactive = 0
    end
    @tweets = Tweet.where("status like 'active'")
    if(!(@tweets.nil?))
      total_active = @tweets.length
    else
      total_active = 0
    end
    @tweets = Tweet.where("status like 'inactive'")
    if(!(@tweets.nil?))
      total_inactive = @tweets.length
    else
      total_inactive = 0
    end
    #obj = ["today_active" : today_active , "today_inactive" : today_inactive , "total_active" : total_active , "total_inactive" : total_inactive ]
    obj =[today_active,today_inactive,total_active,total_inactive]
    render json: obj
  end

  def set_status
    @tweet = Tweet.find(params[:id])
    @tweet.status = params[:status]
    if @tweet.update_attributes(:status => params[:status])
      render json: ["status": "updated"]
    else
      render json: ["status": "failed"]
    end
  end
  # GET /tweets/new
  def new
    @tweet = Tweet.new
  end

  def dashboard
    @twts= Tweet.all.where("status='active'").order(created_at: :desc, updated_at: :desc)
    render json: @twts
  end
  # GET /tweets/1/edit
  def edit
  end

  def moderatorview
  end

  def all_tweets
    if(params[:status] == "all")
      render json: Tweet.all
    else
      render json: Tweet.where("status like '" + params[:status] +"'")
    end
  end
  # POST /tweets
  # POST /tweets.json
  def create
    @tweet = Tweet.new(tweet_params)
    #@usr.tweets << [@tweet]
    @tweet['user_id'] = @usr[:id]
    respond_to do |format|
      if @tweet.save
        format.html { redirect_to @tweet, notice: 'Tweet was successfully created.' }
        format.json { render :show, status: :created, location: @tweet }
      else
        format.html { render :new }
        format.json { render json: @tweet.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tweets/1
  # PATCH/PUT /tweets/1.json
  def update
    respond_to do |format|
      if @tweet.update(tweet_params)
        format.html { redirect_to @tweet, notice: 'Tweet was successfully updated.' }
        format.json { render :show, status: :ok, location: @tweet }
      else
        format.html { render :edit }
        format.json { render json: @tweet.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tweets/1
  # DELETE /tweets/1.json
  def destroy
    @tweet.destroy
    respond_to do |format|
      format.html { redirect_to tweets_url, notice: 'Tweet was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tweet
      @tweet = Tweet.find(params[:id])
      end

    # Never trust parameters from the scary internet, only allow the white list through.
    def tweet_params
      params.require(:tweet).permit(:username, :text, :status, :approvedby, :image)
    end
    def getusr
      session['username']='Alex'
      @usr=User.where("username='"+session['username']+"'")[0]
    end
end
