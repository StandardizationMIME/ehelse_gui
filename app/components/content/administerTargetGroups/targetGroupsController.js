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

    $scope.recoverArchivedTargetGroup = function (targetGroup) {
        targetGroup.isArchived = 0;
        $rootScope.notifySuccess("Målgruppe ble gjenopprettet!", 1000);
    };

    $scope.deleteById = function (id) {
        TargetGroup.deleteById(id);
    };

    $scope.archivedTargetGroupsButton = true;
    $scope.targetGroupsHeadingsClass = "tg-thead";
    $scope.archivedTargetGroupsButtonClass = "btn btn-default pull-right";
    $scope.changeTGClass = function () {
        if ($scope.archivedTargetGroupsButton == true){
            $scope.archivedTargetGroupsButton = false;
            $scope.targetGroupsHeadingsClass = "tg-thead-archive";
            $scope.archivedTargetGroupsButtonClass = "btn btn-primary pull-right";
        } else {
            $scope.archivedTargetGroupsButton = true;
            $scope.targetGroupsHeadingsClass = "tg-thead";
            $scope.archivedTargetGroupsButtonClass = "btn btn-default pull-right";
        }
    };

}]);