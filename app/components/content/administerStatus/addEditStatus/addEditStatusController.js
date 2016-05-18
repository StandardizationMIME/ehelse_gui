"use strict";

angular.module("ehelseEditor").controller("AddEditStatusController", ["$scope", "$rootScope", "Status", function($scope, $rootScope, Status) {

    // Save status values to scope for easier access in the html files
    $rootScope.submitStatusChange = Status.submit;
    $scope.postNewStatus = Status.submit;

}]);