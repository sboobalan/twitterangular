var app = angular.module("userDesgView",['restangular'])
app.controller("userDesgViewCtrl",function($scope,Restangular){

  $scope.filterValue = ["All","User", "Moderator"]
  $scope.desgValue = ["user","moderator"]

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
