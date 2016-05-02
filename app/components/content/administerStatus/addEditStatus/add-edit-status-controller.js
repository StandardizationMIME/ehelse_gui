'use strict';

angular.module('ehelseEditor').controller('AddEditStatusController', ['$scope', '$rootScope', 'Status', function($scope, $rootScope, Status) {

    $rootScope.submitStatusChange = function (status) {

        Status.editStatus(
            status,
            function (data) {
                console.log("Status has been edited");
                $rootScope.notifySuccess("Endring har blitt lagret", 5000);
            },
            function () {
                $rootScope.notifyError("Error: Endring ble ikke lagret", 5000);
            }
        );
    };

    $scope.postNewStatus = function (status) {

        Status.createStatus(status,
            function (data) {
                console.log("Status has been created");
                $rootScope.notifySuccess("Status har blitt opprettet", 5000);
            },
            function () {
                $rootScope.notifyError("Error: Status ble ikke opprettet!", 5000);
            }
        );
    };

}]);