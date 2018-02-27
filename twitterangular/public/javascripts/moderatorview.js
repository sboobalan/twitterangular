var app = angular.module("moderator",['restangular'])

app.directive("dashboard",function(){
  return {
    restrict : "E",
    templateUrl : "/tweets/new",
    controller : "mainCtrl"
  }
})

app.directive("modview",function(){
  return{
    restrict : "E",
    templateUrl :"/moderatorview",
    controller : "modViewCtrl"
  }
})

app.controller("modViewCtrl",function($scope,Restangular,$window){
    $scope.filterValue = ["all","inactive","active"]
    $scope.statusValue = ["active", "inactive"]
      $scope.applyFilter = function(){
      var params = {"status" : $scope.selectedFilter}
      Restangular.all('tweets').customGET("all_tweets",params).then(
        function(data){
          $scope.tweets = data;
        },
        function(error){
          alert("Retrived Failed Please Try again")
        }
      )
    }

    $scope.setStatus = function(tweet,id){
        var params = {"id" : tweet.id , "status" : id }
        Restangular.all('tweets').customGET("setStatus",params).then(
          function(success){
              alert(success[0]["status"]);
              tweet.status=id;
          },
          function(error)
          {
            alert("Update Failed Try again!")
          }

        )

    };
    $scope.showPage = function(){
        $scope.setDashBoard = !$scope.setDashBoard
        $scope.setStatusView = !$scope.setStatusView
      }

})

app.controller('mainCtrl',function($scope,Restangular){
  var service = Restangular.all('tweets');
  var params ={};
  var service2 = Restangular.all('users');
  $scope.tweets={}
  $scope.imag={}
  service.customGET("dashboard",params).then(
  function(data){
    //alert("Inside success");
    $scope.tweets = data.cont;
    $scope.dop=data.dp;
    console.log(data.dp[0].dp);
  },
  function(error)
  {
    alert("Inside failure");
    console.log(error);
  });
  $scope.imgnull=function(tw){
    if(tw.image===null){
      console.log("false");
      return false;

    }
    else {
      console.log(tw.image.url)
      console.log("true");
      return true;

    }
  }
  $scope.date=function(v){

  	d = new Date().toString();
  	console.log(d);
    a=d.split(' ')
    console.log(a[0]);
  }
  $scope.dpimg=function(usrname)
  {

    var param ={uname: usrname};

    service2.customGET("getimage",param).then(
    function(data){
      //alert("Inside success");
      //alert(data.image.url);
      $scope.imag = data;
      console.log($scope.imag);
      return true;
    },
    function(error)
    {
      //alert("Inside failure");
      //console.log(error);
      return false;
    });
  }
});
