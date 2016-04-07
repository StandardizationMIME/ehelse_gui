'use strict';

angular.module('ehelseEditor').controller('AdministerUsersController', ['$scope', '$rootScope', 'ModalService', function ($scope, $rootScope, ModalService) {

    //get all users in the system
    $rootScope.get('/users/', function (data) {
        $rootScope.userList = data.users;
    }, function () {
    });

    //Open a modal
    $scope.openNewModal = function (templateUrl, controller) {
        ModalService.showModal({
            templateUrl: templateUrl,
            controller: controller,
            animation: false
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                console.log(result);
            });
        });
    };

    $scope.addUser = function () {
        $scope.openNewModal('app/components/administerUsers/addUser/add-user-modal-view.html', 'AddUserModalController');
    };

    $scope.deleteUser = function (user) {
        $rootScope.userToDelete = user;
        $scope.openNewModal('app/components/administerUsers/deleteUser/delete-user-modal-view.html', 'DeleteUserModalController');
    };

}]);