"use strict";

angular.module("ehelseEditor").controller("AddEditMandatoryController", ["$scope", "$rootScope", "Mandatory", function($scope, $rootScope, Mandatory) {

    // Save mandatory values to scope for easier access in the html files
    $scope.postNewMandatory = Mandatory.submit;
    $rootScope.submitMandatoryChange = Mandatory.submit;


}]);