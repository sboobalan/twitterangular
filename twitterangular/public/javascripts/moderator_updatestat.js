app = angular.module('moderator_update', ['restangular']);
app.controller('updateStatCtrl', function($scope, Restangular) {
      var allTweets;
      $scope.tweets ={}
      Restangular.all('tweets').customGET("all_tweets").then(
        function(data)
        {
          $scope.tweets = data;
          /*allTweets = data;
          if(allTweets !== undefined)
          {
            for( var i in alltweets)
            {
              if(i["status"] == "inactive")
                {
                  $scope.tweets.push(i)
                }
            }
          }*/
        },
        function(error)
        {
          console.log("Retrive Failed");
        }
      )



     var setStatus = function(tweet,status){
          var params = {"id" : tweet.id , "status" : status}
          console.log(params);
        }
          /*Restangular.all('tweets').customGET("setStatus",params).then(
            function(status){

            }

          )

      };
      $scope.alert = function(text) {
    		alert(text);
	    };
	    var service = Restangular.all('tweets');
	    var params ={name: "Ajju"};
	    service.customGET("temp1",params).then(
	    function(data){
		alert("Inside success");
		$scope.data = data;
	    },
	    function(error)
	    {
		alert("Inside failure");
		console.log(error);
  });*/


	});
