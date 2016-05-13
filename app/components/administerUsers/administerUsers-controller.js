'use strict';

angular.module('ehelseEditor').controller('AdministerUsersController', ['$scope', '$rootScope', 'ModalService', function ($scope, $rootScope, ModalService) {

    //get all users in the system
    $rootScope.get('/users/', function (data) {
        $rootScope.userList = data.users;
    }, function () {
    });

    $scope.addUser = function () {
        $rootScope.shouldBeOpen = true;
        $scope.openModal('app/components/administerUsers/addUser/add-user-modal-view.html', 'AddUserModalController');
    };

    $scope.deleteUser = function (user) {
        $rootScope.shouldBeOpen = true;
        $rootScope.userToDelete = user;
        $scope.openModal('app/components/administerUsers/deleteUser/delete-user-modal-view.html', 'DeleteUserModalController');
    };

}]);