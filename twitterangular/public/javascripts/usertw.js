var app = angular.module("user",['restangular'])
app.directive("main",function(){

  return{
    restrict : "E",
    controller : "mainCtrl",
    templateUrl :  "/tweets/new"
  }
})

app.directive("usertweets",function(){

  return{
    restrict : "E",
    controller : "userTweetsCtrl",
    templateUrl :  "/users/"+sessionStorage.getItem("user_id")+"/usertweets"
  }
})

app.controller('userTweetsCtrl', function($scope,$location, Restangular) {

    $scope.showPage=function(){
      $scope.twnew=!$scope.twnew;
      $scope.usrtw=!$scope.usrtw;
    }
    $scope.alert = function(text) {
      alert(text);
    };
    //var id=$location.absUrl().toString().split('/')[4];
    //window.location.href = "/users/" + id + "/usertweets"
    var service = Restangular.all('users');
    console.log(sessionStorage.getItem("user_name"));
    var params ={user_id: sessionStorage.getItem("user_id")};
    service.customGET("usertweetsang",params).then(
    function(data){
      //alert("Inside success");
      // console.log("gggg"+id);
      $scope.tweets = data;
      console.log(data);
    },
    function(error)
    {
      alert("Inside failure");
      //$scope.tweets="Page does not exist";
      console.log(error);
    });

    $scope.imgnull=function(tw)
    {
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
});

app.controller('mainCtrl',function($scope,Restangular){
  $scope.showPage=function(){
    $scope.twnew=!$scope.twnew;
    $scope.usrtw=!$scope.usrtw;
  }

  var service = Restangular.all('tweets');
  var params ={};
  $scope.tweets={}
  service.customGET("dashboard",params).then(
  function(data){
    //alert("Inside success");
    $scope.tweets = data.cont;
    $scope.dop=data.dp;
    console.log(data);
    // alert(data);
  },
  function(error)
  {
    alert("Inside failure");
    console.log(error);
  });
  $scope.imgnull=function(tw){
    if(angular.isUndefined(tw.image) || tw.image === null){
      //console.log("false");
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
});
