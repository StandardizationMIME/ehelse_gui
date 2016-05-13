"use strict";

angular.module("ehelseEditor").controller("AddEditStatusController", ["$scope", "$rootScope", "Status", function($scope, $rootScope, Status) {

    $rootScope.submitStatusChange = Status.submit;

    $scope.postNewStatus = Status.submit;

}]);