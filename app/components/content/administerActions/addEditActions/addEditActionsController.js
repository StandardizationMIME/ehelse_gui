"use strict";

angular.module("ehelseEditor").controller("AddEditActionController", ["$scope", "$rootScope", "Action", function($scope, $rootScope, Action) {

    $rootScope.submitActionChange = Action.submit;

    $scope.postNewAction = Action.submit;

}]);