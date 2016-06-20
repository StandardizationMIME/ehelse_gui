"use strict";

angular.module("ehelseEditor").controller("AdministerStatusController",["$scope", "$rootScope", "Status", function($scope, $rootScope, Status){

    // Save status values to scope for easier access in the html files
    $scope.statuses = Status.getAll();
    $scope.deleteStatus = Status.delete;

    // Open modal for creating a new status
    $scope.showNewStatusModal = function () {
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal("app/components/content/administerStatus/addEditStatus/addStatusModal.html", "AddEditStatusController");
    };

    // Open modal for editing a status
    $scope.showEditStatusModal = function (statusId) {
        $rootScope.currentStatus = Status.clone(Status.getById(statusId));
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal("app/components/content/administerStatus/addEditStatus/editStatusModal.html", "AddEditStatusController");
    };

    $scope.archivedStatusButton = true;
    $scope.statusHeadingClass = "white-color blue-background";
    $scope.archivedStatusButtonClass = "btn btn-default pull-right";
    $scope.changeStatusClass = function () {
        if ($scope.archivedStatusButton == true){
            $scope.statusHeadingClass = "white-color darkgray-background";
            $scope.archivedStatusButtonClass = "btn btn-primary pull-right";
            $scope.archivedStatusButton = false;
        } else {
            $scope.statusHeadingClass = "white-color blue-background";
            $scope.archivedStatusButtonClass = "btn btn-default pull-right";
            $scope.archivedStatusButton = true;
        }
    };
    $scope.recoverArchivedStatus = function (status) {
        status.isArchived = 0;
        $rootScope.notifySuccess("Status ble gjenopprettet!", 1000);
    };
}]);
