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


}]);