"use strict";

angular.module("ehelseEditor").controller("AddUserController", [ "$scope", "$http","$rootScope", function( $scope, $http, $rootScope) {

    //init values
    $scope.newUser = {
        "name" : "",
        "email" : ""
    };

    //check if fields are valid and create new user
    $scope.addUser = function(){
        if($scope.newUser.name != "" && $scope.newUser.email != ""){
            $rootScope.post("users/",$scope.newUser,function(data){
                $rootScope.userList.push(data);
                $scope.notifySuccess("En email er sendt til " + $scope.newUser.email + " for å bekrefte opprettingen.",6000);
            },function(){
                $scope.notifyError("Brukeren ble ikke opprettet.",6000);
            });
        }else{
            $scope.notifyError("En av feltene var tomme, brukeren ble ikke opprettet.",6000);
        }
    };
}]);
