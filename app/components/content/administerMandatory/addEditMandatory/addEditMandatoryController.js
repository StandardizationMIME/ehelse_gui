"use strict";

angular.module("ehelseEditor").controller("AddEditMandatoryController", ["$scope", "$rootScope", "Mandatory", function($scope, $rootScope, Mandatory) {
    
    $scope.postNewMandatory = Mandatory.submit;

    $rootScope.submitMandatoryChange = Mandatory.submit;


}]);