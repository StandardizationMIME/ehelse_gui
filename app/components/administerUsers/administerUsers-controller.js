'use strict';

angular.module('ehelseEditor').controller('AdministerUsersController', ['$scope', '$rootScope', 'ModalService', function ($scope, $rootScope) {

    //get all users in the system
    $rootScope.get("/users/", function (data) {
        $scope.userData = data;
    }, function () {
    });


    //add user modal
    $scope.addUserModal = function(){
        ModalService.showModal({
            templateUrl: "app/components/administerUsers/addUserModal-view.html",
            controller: "AddUserModalController",
            animation: false
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                console.log(result);
            });
        });
    };


    //TODO add user
    $scope.addUser = function(){


    };

    //delete specific user
    $scope.deleteUser = function (userId, name) {
        var inputName = prompt("Skriv inn navnet til brukeren for å slette den for alltid: \"" + name + "\"");

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