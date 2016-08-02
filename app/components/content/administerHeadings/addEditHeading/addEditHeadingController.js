"use strict";

angular.module("ehelseEditor").controller("AddEditHeadingController", ["$scope", "$rootScope", "Heading", function($scope, $rootScope, Heading) {

    // Save heading values to scope for easier access in the html files
    $rootScope.submitHeadingChange = Heading.submit;
    $scope.postNewHeading = Heading.submit;

}]);