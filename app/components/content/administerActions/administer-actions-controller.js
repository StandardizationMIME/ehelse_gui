'use strict';

angular.module('ehelseEditor').controller('AdministerActionController',['$scope', '$rootScope', 'Action', function($scope, $rootScope, Action){
    $scope.actionsOptionList = Action.actions_option_list;

    $scope.showNewActionModal = function () {
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal('app/components/content/administerActions/addEditActions/add-action-modal.html', 'AddEditActionController');
    };

    $scope.deleteActionById = function (action) {
        
        Action.deleteAction(action);
    };
    
    $scope.getActionById = function (id) {

        Action.getById(
            id,
            function (data) {
                $rootScope.currentAction = data;
            },
            function () {
                console.log(error);
            }
        );
    };
    
    $scope.showEditActionModal = function (actionId) {
        $scope.getActionById(actionId);
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal('app/components/content/administerActions/addEditActions/edit-action-modal.html', 'AddEditActionController');
    };

}]);
