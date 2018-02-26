var app = angular.module("admin",['restangular'])

app.factory("setPage",function(){
  /*$scope.setUserDesg=! ($scope.setUserDesg);
  $scope.setTweetStats=! ($scope.setTweetStats);*/
  var setUserDesg = true;
  var setTweetStats= false;
  return{
    openPage(){
      setUserDesg=! (setUserDesg);
      setTweetStats=! (setTweetStats);
    }
  }
})

app.directive("tweetstats",function(){

  return{
    restrict : "E",
    controller : "tweetStatCtrl",
    templateUrl :  "/tweetnew"
  }
})

app.directive("userdesgset",function(){

  return{
    restrict : "E",
    controller : "userDesgViewCtrl",
    templateUrl : "/user_desg_set"
  }
})

app.controller("tweetStatCtrl",function($scope,Restangular){

  $scope.showPage = function(){
    $scope.setTweetStats = !$scope.setTweetStats
    $scope.setUserDesg = !$scope.setUserDesg
  }
  Restangular.all('tweets').customGET("tweet_stat").then(
    function(data)
    {
      $scope.stat = data;
    },
    function(error)
    {
      alert("Retrive Failed Try again")
    }
  )
})

app.controller("userDesgViewCtrl",function($scope,Restangular){

  $scope.showPage = function(){
    $scope.setTweetStats = !$scope.setTweetStats
    $scope.setUserDesg = !$scope.setUserDesg
  }
  $scope.filterValue = ["All","User", "Moderator"]
  $scope.desgValue = ["User","Moderator"]
  $scope.applyFilter = function(){
    var params = {"type" : $scope.selectedFilter }
    Restangular.all('users').customGET("allUsers",params).then(
      function(success)
      {
        $scope.usrs = success
      },
      function(error)
      {
        alert("Failed to retrive users Try again")
      }
    )
  }

  $scope.setDesignation = function(user,status){
    var params = {"id" : user.id, "status" : status}
    Restangular.all('users').customGET("set_desg" , params).then(
      function(success)
      {
        user.designation = status
        alert(success[0]["status"])
      },
      function(error)
      {
        alert("Try again")
      }
    )

  }
})
