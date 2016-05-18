"use strict";

angular.module("ehelseEditor").controller("AdministerActionController",["$scope", "$rootScope", "Action", function($scope, $rootScope, Action){

    // Save action values to scope for easier access in the html files
    $scope.actions = Action.getAll();
    $scope.deleteActionById = Action.delete;

    // Open modal for creating new action
    $scope.showNewActionModal = function () {
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal("app/components/content/administerActions/addEditActions/addActionModal.html", "AddEditActionController");
    };

    // Open modal for editing action
    $scope.showEditActionModal = function (actionId) {
        $rootScope.currentAction = Action.clone(Action.getById(actionId));
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal("app/components/content/administerActions/addEditActions/editActionModal.html", "AddEditActionController");
    };

}]);
