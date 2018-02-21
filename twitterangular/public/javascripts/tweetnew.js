app=angular.module("dash",['restangular']);
app.controller('mainCtrl',function($scope,Restangular){
  var service = Restangular.all('tweets');
  var params ={};
  $scope.tweets={}
  service.customGET("dashboard",params).then(
  function(data){
    //alert("Inside success");
    $scope.tweets = data;
    console.log(data[0].image);
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
});
