var app = angular.module("modView",['restangular'])
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
})
