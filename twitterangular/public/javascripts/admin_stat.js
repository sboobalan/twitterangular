var app = angular.module("tweetStat",['restangular'])
app.controller("tweetStatCtrl",function($scope,Restangular){
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
