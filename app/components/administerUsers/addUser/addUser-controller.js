'use strict';

angular.module('ehelseEditor').controller('AddUserController', [ '$scope', '$http','$rootScope', function( $scope, $http, $rootScope) {

    $scope.newUser = {
        "name" : "",
        "email" : ""
    };

    $scope.addUser = function(){


        if($scope.newUser.name != "" && $scope.newUser.email != ""){
            alert($scope.newUser.name + " + " + $scope.newUser.email);
            $rootScope.post("users/",$scope.newUser,function(){
                $scope.notifyStandardSuccess("Opprettet ny bruker.")
            },function(){
                $scope.notifyStandardError("Brukeren ble ikke opprettet.")
            });
        }else{
            //feedback on empty
        }



    };

}]);
