"use strict";

angular.module("ehelseEditor").controller("AddEditActionController", ["$scope", "$rootScope", "Action", function($scope, $rootScope, Action) {

    // Save action values to scope for easier access in the html files
    $rootScope.submitActionChange = Action.submit;
    $scope.postNewAction = Action.submit;

}]);