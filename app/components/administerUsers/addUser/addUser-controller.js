'use strict';

angular.module('ehelseEditor').controller('AddUserController', [ '$scope', '$http','$rootScope', function( $scope, $http, $rootScope) {

    $scope.close = function(result) {
        close(result, 200); // close, but give 200ms for bootstrap to animate
    };

    $scope.newUser = {
        "name" : "",
        "email" : ""
    };

    $scope.addUser = function(){

        if($scope.newUser.name != "" && $scope.newUser.email != ""){
            $rootScope.post("/users/",$scope.newUser,function(){},function(){});
        }else{
            //feedback on empty
        }



    };

}]);
