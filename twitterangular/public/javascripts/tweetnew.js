app=angular.module("dash",['restangular']);
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
