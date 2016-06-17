"use strict";

angular.module("ehelseEditor").controller("AdministerMandatoryController",["$scope", "$rootScope", "Mandatory", function($scope, $rootScope, Mandatory){

    // Save mandatory values to scope for easier access in the html files
    $scope.mandatories = Mandatory.getAll();
    $scope.deleteMandatory = Mandatory.delete;

    // Open modal for creating new mandatory value
    $scope.openNewMandatoryModal = function () {
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal("app/components/content/administerMandatory/addEditMandatory/addMandatoryModal.html", "AddEditMandatoryController");
    };

    // Open modal for editing mandatory value
    $scope.openEditMandatoryModal = function (mandatoryId) {
        $rootScope.currentMandatory = Mandatory.clone(Mandatory.getById(mandatoryId));
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal("app/components/content/administerMandatory/addEditMandatory/editMandatoryModal.html", "AddEditMandatoryController");
    };

    $scope.archivedMandatoryButton = true;
    $scope.mandatoryHeadingClass = "white-color blue-background";
    $scope.archivedMandatoryButtonClass = "btn btn-default pull-right";
    $scope.changeMandatoryClass = function () {
        if ($scope.archivedMandatoryButton == true){
            $scope.mandatoryHeadingClass = "white-color darkgray-background";
            $scope.archivedMandatoryButtonClass = "btn btn-primary pull-right";
            $scope.archivedMandatoryButton = false;
        } else {
            $scope.mandatoryHeadingClass = "white-color blue-background";
            $scope.archivedMandatoryButtonClass = "btn btn-default pull-right";
            $scope.archivedMandatoryButton = true;
        }
    };
    $scope.recoverMandatory = function (mandatory) {
        mandatory.isArchived = 0;
        $rootScope.notifySuccess("Obligatoriskhet ble gjenopprettet!", 1000);
    };

}]);
