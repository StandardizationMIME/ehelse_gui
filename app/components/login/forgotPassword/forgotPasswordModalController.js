"use strict";

angular.module("ehelseEditor").controller("ForgotPasswordModalController", [ "$rootScope","$scope","close", function($rootScope, $scope, close) {

    $scope.close = function(result) {
        console.log("I closed");
        close(result, 500);
    };


}]);