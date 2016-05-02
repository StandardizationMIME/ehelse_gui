'use strict';

angular.module('ehelseEditor').controller('AdministerStatusController',['$scope', '$rootScope', 'Status', function($scope, $rootScope, Status){

    $scope.statusOptionList = Status.status_option_list;

    $scope.showNewStatusModal = function () {
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal('app/components/content/administerStatus/addEditStatus/add-status-modal.html', 'AddEditStatusController');
    };

    $scope.showEditStatusModal = function (statusId) {
        $scope.getStatusById(statusId);
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal('app/components/content/administerStatus/addEditStatus/edit-status-modal.html', 'AddEditStatusController');
    };

    $scope.deleteStatusById = function (status){
        Status.deleteStatus(status);
    };

    $scope.getStatusById = function (id) {
        Status.getById(
            id,
            function (data) {
                $rootScope.currentStatus = data;
            },
            function () {
                console.log(error);
            }
        );
    };
}]);
