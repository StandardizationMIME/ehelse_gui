"use strict";

angular.module("ehelseEditor").controller("AdministerUsersController", ["$scope", "$rootScope", "ModalService", function ($scope, $rootScope, ModalService) {

    //get all users in the system
    $rootScope.get("/users/", function (data) {
        $rootScope.userList = data.users;
    }, function () {
    });

    //open modal for adding user
    $scope.addUser = function () {
        $rootScope.shouldBeOpen = true;
        $scope.openModal("app/components/administerUsers/addUser/addUserModalView.html", "AddUserModalController");
    };

    //open modal for deleting user
    $scope.deleteUser = function (user) {
        $rootScope.shouldBeOpen = true;
        $rootScope.userToDelete = user;
        $scope.openModal("app/components/administerUsers/deleteUser/deleteUserModalView.html", "DeleteUserModalController");
    };

}]);