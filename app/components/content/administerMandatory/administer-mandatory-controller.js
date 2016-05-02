'use strict';

angular.module('ehelseEditor').controller('AdministerMandatoryController',['$scope', '$rootScope', 'Mandatory', function($scope, $rootScope, Mandatory){

    $scope.mandatoryOptionList = Mandatory.mandatory_option_list;
    
    $scope.openNewMandatoryModal = function () {
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal('app/components/content/administerMandatory/addEditMandatory/add-mandatory-modal.html', 'AddEditMandatoryController');
    };
    
    $scope.openEditMandatoryModal = function (mandatoryId) {
        $rootScope.getMandatoryById(mandatoryId);
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal('app/components/content/administerMandatory/addEditMandatory/edit-mandatory-modal.html', 'AddEditMandatoryController');
    };

    $rootScope.getMandatoryById = function (id) {
        Mandatory.getById(
            id,
            function (data) {
                $rootScope.currentMandatory = data;
            },
            function () {
                console.log(error);
            }
        )
    };
    
    $scope.deleteMandatory = function (mandatory) {
        Mandatory.deleteMandatory(mandatory);
    };
/*
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
*/
}]);
