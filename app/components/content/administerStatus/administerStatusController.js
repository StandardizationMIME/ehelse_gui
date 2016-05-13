"use strict";

angular.module("ehelseEditor").controller("AdministerStatusController",["$scope", "$rootScope", "Status", function($scope, $rootScope, Status){

    $scope.statuses = Status.getAll();

    $scope.showNewStatusModal = function () {
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal("app/components/content/administerStatus/addEditStatus/addStatusModal.html", "AddEditStatusController");
    };

    $scope.showEditStatusModal = function (statusId) {
        $rootScope.currentStatus = Status.clone(Status.getById(statusId));
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal("app/components/content/administerStatus/addEditStatus/editStatusModal.html", "AddEditStatusController");
    };

    $scope.deleteStatus = Status.delete;

}]);
