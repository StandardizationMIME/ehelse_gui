"use strict";

angular.module("ehelseEditor").controller("AdministerContactAddressController",["$scope", "$rootScope", "ContactAddress", function($scope, $rootScope, ContactAddress){

    // Save contact address values to scope for easier access in the html files
    $scope.contactAddresses = ContactAddress.getAll();
    $scope.deleteContactAddress = ContactAddress.delete;

    // Open modal for creating a new contactAddress
    $scope.showNewContactAddressModal = function () {
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal("app/components/content/administerContactAddresses/addEditContactAddress/addContactAddressModal.html", "AddEditContactAddressController");
    };

    // Open modal for editing a contactAddress
    $scope.showEditContactAddressModal = function (contactAddressId) {
        $rootScope.currentContactAddress = ContactAddress.clone(ContactAddress.getById(contactAddressId));
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal("app/components/content/administerContactAddresses/addEditContactAddress/editContactAddressModal.html", "AddEditContactAddressController");
    };

    $scope.archivedContactAddressButton = true;
    $scope.contactAddressHeadingClass = "white-color blue-background";
    $scope.archivedContactAddressButtonClass = "btn btn-default pull-right";
    $scope.changeContactAddressClass = function () {
        if ($scope.archivedContactAddressButton == true){
            $scope.contactAddressHeadingClass = "white-color darkgray-background";
            $scope.archivedContactAddressButtonClass = "btn btn-primary pull-right";
            $scope.archivedContactAddressButton = false;
        } else {
            $scope.contactAddressHeadingClass = "white-color blue-background";
            $scope.archivedContactAddressButtonClass = "btn btn-default pull-right";
            $scope.archivedContactAddressButton = true;
        }
    };
    $scope.recoverArchivedContactAddress = function (contactAddress) {
        contactAddress.isArchived = 0;
        $rootScope.notifySuccess("ContactAddress ble gjenopprettet!", 1000);
    };
}]);
