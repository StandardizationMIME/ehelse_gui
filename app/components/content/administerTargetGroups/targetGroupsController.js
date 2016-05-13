'use strict';

angular.module('ehelseEditor').controller('TargetGroupsController',['$scope','ModalService','$rootScope', 'TargetGroup', function($scope, ModalService, $rootScope, TargetGroup){
    $scope.targetGroups = TargetGroup.getAll();
    $scope.TGDictionary = TargetGroup.getAllAsDict();


    $scope.showEditTGModal = function(group){
        $rootScope.shouldBeOpen = true;
        $rootScope.editGroup = TargetGroup.clone(group);
        $rootScope.openModal('app/components/content/administerTargetGroups/editTargetGroups/editTargetGroupModal.html', 'EditTargetGroupController');
    };

    $scope.showNewTGModal = function () {
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal('app/components/content/administerTargetGroups/addTargetGroups/newTargetGroupModal.html', 'NewTargetGroupController');
    };

}]);