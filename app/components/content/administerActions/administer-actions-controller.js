'use strict';

angular.module('ehelseEditor').controller('AdministerActionController',['$scope', '$rootScope', 'Action', function($scope, $rootScope, Action){
    $scope.actionsOptionList = Action.actions_option_list;

    $scope.showNewActionModal = function () {
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal('app/components/content/administerActions/addEditActions/add-edit-actions-modal.html', 'AddEditActionController');
    };

    
    $scope.cleanAction = function () {
        $rootScope.newAction = {
            "id": "",
            "name": "",
            "description": ""
        };
    };
    $scope.submitActionChange = function (action) {
        
    };
    
    $scope.postNewAction = function () {
        
    }
}]);
