'use strict';

angular.module('ehelseEditor').controller('AdministerUsersController', ['$scope', '$rootScope', function ($scope, $rootScope) {

    $rootScope.get("/users/", function (data) {
        $scope.userData = data;
    }, function () {
    });

}]);