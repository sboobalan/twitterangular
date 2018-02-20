app = angular.module('moderator_update', ['restangular']);
app.controller('updateStatCtrl', function($scope, Restangular) {
      $scope.tweets ={}
      Restangular.all('tweets').customGET("all_tweets").then(
        function(data)
        {
          $scope.tweets = data;
          if($scope.tweets.length == 0)
          {
              $scope.anyTweets = "No more inactive Tweets to update"
          }
        },
        function(error)
        {
          $scope.anyTweets = "Retrive Failed";
        }
      )
      $scope.setStatus = function(tweet,status){
          var params = {"id" : tweet.id , "status" : status}
          Restangular.all('tweets').customGET("setStatus",params).then(
            function(success){
                alert(success[0][status]);
                tweet.status=status;
            },
            function(error)
            {
              alert("Update Failed Try again!")
            }

          )

      };


	});
