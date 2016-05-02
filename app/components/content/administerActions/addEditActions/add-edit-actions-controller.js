'use strict';

angular.module('ehelseEditor').controller('AddEditActionController', ['$scope', '$rootScope', 'Action', function($scope, $rootScope, Action) {

    $rootScope.submitActionChange = function (action) {
        Action.editAction(
            action,
            function (data) {
                console.log("Action has been edited");
                $rootScope.notifySuccess("Endring har blit lagret", 5000);
            },
            function () {
                $rootScope.notifyError("Error: Endring ble ikke lagret!", 5000);
            }
        );
    };

    $scope.postNewAction = function (action) {

        Action.createAction(action,
            function (data){
                console.log("Action has been created");
                $rootScope.notifySuccess("Hendelse har blitt opprettet", 5000);
            },
            function () {
                $rootScope.notifyError("Error: Hendelse ble ikke opprettet!", 5000);
            });
    };

}]);