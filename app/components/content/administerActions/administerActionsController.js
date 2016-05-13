"use strict";

angular.module("ehelseEditor").controller("AdministerActionController",["$scope", "$rootScope", "Action", function($scope, $rootScope, Action){
    $scope.actions = Action.getAll();


    $scope.showNewActionModal = function () {
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal("app/components/content/administerActions/addEditActions/addActionModal.html", "AddEditActionController");
    };

    $scope.deleteActionById = Action.delete;

    $scope.showEditActionModal = function (actionId) {
        $rootScope.currentAction = Action.clone(Action.getById(actionId));
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal("app/components/content/administerActions/addEditActions/editActionModal.html", "AddEditActionController");
    };

}]);
