"use strict";

angular.module("ehelseEditor").controller("AddEditContactAddressController", ["$scope", "$rootScope", "ContactAddress", function($scope, $rootScope, ContactAddress) {

    // Save contact address values to scope for easier access in the html files
    $rootScope.submitContactAddressChange = ContactAddress.submit;
    $scope.postNewContactAddress = ContactAddress.submit;

}]);