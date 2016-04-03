'use strict';

angular.module('ehelseEditor').controller('AdministerUsersController', ['$scope', '$rootScope', function ($scope, $rootScope) {

    //get all users in the system
    $rootScope.get("/users/", function (data) {
        $scope.userData = data;
    }, function () {
    });

    //delete a specific user
    $scope.deleteUser = function (userId, name) {

        /*
         $rootScope.notifyTopicError("Passordet ble ikke endret.");
         $rootScope.notifyStandardSuccess("Passordet ditt er endret.");
         */

        var inputName = prompt("Skriv inn navnet til brukeren for å slette den for alltid: " + name + "");
        //delete request goes here

        if (inputName === name) {
            $rootScope.delete("/users/" + userId, {}, function () {
                $rootScope.notifyStandardSuccess("Brukeren ble slettet.");
            }, function () {
                $rootScope.notifyTopicError("Brukeren ble ikke slettet.");
            });
        } else {
            $rootScope.notifyTopicError("Brukeren ble ikke slettet; navnet du skrev inn var ikke riktig.");
        }
    };

}]);