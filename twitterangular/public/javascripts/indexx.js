var app = angular.module('signin',['restangular']);
app.controller('signinctrl',function($scope,$window,Restangular){



  $scope.login = function($window){
    console.log ($scope.uname);
    var users = Restangular.all('users');
    var params = {username: $scope.uname};
    users.customGET("signin_func",params).then(
      function(data){
        console.log(data);
        if(data === undefined)
        {
          $scope.uname ="";
          $scope.pwd = "";
          alert("New user?Proceed to signup");
        }
        else {
          if (data.password != $scope.pwd)
          {
           alert ("Enter correct Password");
           $scope.pwd = "";
          }
          else if (data.password === $scope.pwd) {
            //$cookieStore.put('usrid', data.id);boo is a useless fellow
            window.sessionStorage.setItem('user_id', data.id);
            window.sessionStorage.setItem('user_name', data.username);
            if(data.designation === "user")
            {
              window.location.href = '/userpage';
            }
            else if (data.designation === "moderator")
            {
              window.location.href = '/moderatorview';
            }
            else if (data.designation === "admin"){
              window.location.href = '/admin_stat';
            }
            //alert("Welcome " + $scope.uname);
          }
        }
      },
      function(error)
      {
        alert("Inside failure");
        console.log(error);
      });
    }
});

var app = angular.module('signup',['restangular'])
app.controller('signupctrl',function($scope,$window,Restangular){

  // Setting a cookie
  //console.log($window.sessionStorage.getItem('usrid'));
  $scope.check = function()
  {
    var users = Restangular.all('users');
    var params = {username: $scope.uname};
    users.customGET("check",params).then(
      function(data){
        if(data != undefined)
        {
          $scope.status = "Username exists";
          $scope.uname = "";
        }
      },
      function(error)
      {
        alert("Inside failure");
        console.log(error);
      }
    );
  }
  $scope.checkmail = function(){
    var users = Restangular.all('users');
    var params = {email: $scope.email};
    users.customGET("checkmail",params).then(
      function(data){
        if(data != undefined)
        {
          $scope.statusmail = "Email ID already exists";
          $scope.email = "";
        }
      },
      function(error)
      {
        alert("Inside failure");
        console.log(error);
      }
    );
  }
  $scope.checkpwd = function(){
    console.log("checkpwd")
    if($scope.password != $scope.confirm_password)
    {
      $scope.statuspwd = "Password mismatch";
      $scope.confirm_password = "";
    }
  }
  $scope.remove = function(){
    $scope.status = "";
  }
  $scope.remove1 = function(){
    $scope.statuspwd = "";
  }
  $scope.remove2 = function(){
    $scope.statusmail = "";
  }

});
