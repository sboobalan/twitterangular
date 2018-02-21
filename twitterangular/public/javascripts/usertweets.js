app = angular.module('usertweets', ['restangular']);

app.controller('mainCtrl', function($scope,$location, Restangular) {
    $scope.alert = function(text) {
      alert(text);
    };
    var id=$location.absUrl().toString().split('/')[4];
    var service = Restangular.all('users');
    console.log(sessionStorage.getItem("username"));
    var params ={user_id: id};
    service.customGET("usertweetsang",params).then(
    function(data){
      //alert("Inside success");


      console.log("gggg"+id);
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
