'use strict';

angular.module('ehelseEditor').controller('AddEditMandatoryController', ['$scope', '$rootScope', 'Mandatory', function($scope, $rootScope, Mandatory) {
    
    $scope.postNewMandatory = function (mandatory) {
        Mandatory.createMandatory(
            mandatory,
            function (data) {
                console.log("Mandatory has been created");
                $rootScope.notifySuccess("Mandatory har blitt opprettet")
            },function () {
                
            }
        );
    };

    $rootScope.submitMandatoryChange = function (mandatory) {
        Mandatory.editMandatory(
            mandatory,
            function (data) {
                console.log("Mandatory has been edited");
                $rootScope.notifySuccess("Endring har blitt lagret", 5000);
            },
            function () {
                $rootScope.notifyError("Error: Endring ble ikke lagret!", 5000);
            }
        );
    }
/*
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
*/

}]);