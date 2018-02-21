class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  #before_action :getusr, only: [:usertweets]
  # GET /users
  # GET /users.json
  def index
    @users = User.all

  end

  def type_change
	@users = User.all.where("designation != 'admin'").paginate(:page => params[:page], :per_page => 10)
  end
  def status_set
        @user = User.find(params[:user_id])
        @user.update_attributes(:designation => params["format"])
        @query = "$(\"##{params[:user_id]}\").text(\"#{params[:format]}\")"
	      render js: @query
  end


  # GET /users/1
  # GET /users/1.json
  def show
  end
  
  def usertweets
  end
  def usertweetsang
    @usr=User.find(params['user_id'])
    @tweets=@usr.tweets
    render json: @tweets
  end
  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)
    @user.designation="user"
    respond_to do |format|
      if @user.save
        puts "aaaaaaaaaaaaaaaaaaaaaa"
        puts session[:username]
        format.html { redirect_to users_url, notice: 'User was successfully created.' }
        #format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

   # PATCH/PUT /users/1
   # PATCH/PUT /users/1.json
   def update
     respond_to do |format|
       if @user.update(user_params)
         format.html { redirect_to @user, notice: 'User was successfully updated.' }
         format.json { render :show, status: :ok, location: @user }
       else
         format.html { render :edit }
         format.json { render json: @user.errors, status: :unprocessable_entity }
       end
     end
   end

   # DELETE /users/1
   # DELETE /users/1.json
   def destroy
     @user.destroy
     respond_to do |format|
       format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
       format.json { head :no_content }
     end
   end

   def dpchange
     @usr1 = User.where("username like '" + session[:username] + "'")[0]
     @usr1.update_attributes(:dp => params[:newdp])
     puts "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaassssssssss"
     puts params[:newdp]
   end

   def passwordChange
     @usr1 = User.where("username like '" + session[:username] + "'")[0]
     @usr1.update_attributes(:password => params[:password])
     render js:""
   end

   def getDp
     @usr1 = User.where("username like '" + session[:username] + "'")[0]
     render js: @usr1.dp.thumb.url
   end

   def login
     if( User.find_by username: params[:uname])
    	  @newuser = User.find_by username: params[:uname]
        if(@newuser[:password] .eql? params[:password])
          respond_to do |format|
            if(@newuser[:designation]) .eql? "moderator"
              session[:username] = params[:uname]
              puts @newuser[:designation]
              format.html { redirect_to new_tweet_url}
            elsif(@newuser[:designation]) .eql? "admin"
              session[:username] = params[:uname]
			        puts @newuser[:designation]
			        format.html { redirect_to type_change_url}
            else
              format.html { redirect_to new_tweet_url, flash[:notice] => "LoggedIn Successfully" }
		   	      session[:username] = params[:uname]
            end
          end
        else
          respond_to do |format|
            format.html {redirect_to users_url, notice: 'Invalid password'}
          end
        end
      else
        respond_to do |format|
    			format.html {redirect_to users_url, notice: 'Invalid username'}
        end
      end
    end
    def check
      render json: (User.find_by username: params[:username])
    end
    def checkmail
      render json: (User.find_by email: params[:email])
    end

    def signin_func
      puts params
      render json: (User.find_by username: params[:username])
    end
    private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:name, :username, :password, :email, :designation,:dp)
    end
    def getusr
      session['username']='Alex'
      @usr=User.where("username='"+session['username']+"'")
    end
end
