"use strict";

angular.module("ehelseEditor").controller("AddUserController", [ "$scope", "$http","$rootScope", "close", function( $scope, $http, $rootScope, close) {

    //set default input values
    $scope.newUser = {
        "name" : "",
        "email" : ""
    };

    //check if name and email is filled out, and creates a new user
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

    $scope.close = function (result){
        if (result == "add"){
            $scope.addUser();
            close("User added",500);
        }else{
            close("Nothing added",500);
        }
    };
}]);
