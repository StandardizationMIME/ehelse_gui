"use strict";

angular.module("ehelseEditor").controller("TargetGroupsController",["$scope","ModalService","$rootScope", "TargetGroup", function($scope, ModalService, $rootScope, TargetGroup){

    // Save target group values to scope for easy access in the html files
    $scope.targetGroups = TargetGroup.getAll();
    $scope.TGDictionary = TargetGroup.getAllAsDict();

    // Open modal for editing target group
    $scope.showEditTGModal = function(group){
        $rootScope.shouldBeOpen = true;
        $rootScope.editGroup = TargetGroup.clone(group);
        $rootScope.openModal("app/components/content/administerTargetGroups/editTargetGroups/editTargetGroupModal.html", "EditTargetGroupController");
    };

    // Open modal for creating new target group
    $scope.showNewTGModal = function () {
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal("app/components/content/administerTargetGroups/addTargetGroups/newTargetGroupModal.html", "NewTargetGroupController");
    };

}]);