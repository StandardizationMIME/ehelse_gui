"use strict";

angular.module("ehelseEditor").controller("AdministerFieldsController", ["$scope", "$rootScope", "DocumentField", function ($scope, $rootScope, DocumentField) {

    // Save document field values to scope for easier access in the html files
    $scope.documentFields = DocumentField.getAll();

    // Set document type id. Used to alter between which type to create.
    $rootScope.setTypeId = function(number){
        $rootScope.typeId = number;
    };

    // Delete field
    $rootScope.deleteFieldById = function(field){
        DocumentField.delete(
            field,
            function(){
                $rootScope.confirmationValue = false;
                console.log("Successfully archived the field");
                $rootScope.notifySuccess("Felt ble arkivert!", 1000);
            },
            function(){
            }
        );
    };
    $rootScope.recoverArchivedField = function (field) {
        field.isArchived = 0;
        $rootScope.notifySuccess("Felt ble gjenopprettet!", 1000);
    };

    $scope.archivedStandardButton = true;
    $scope.standardHeadingsClass = "white-color blue-background";
    $scope.archivedStandardButtonClass = "btn btn-default pull-right";
    $scope.changeStandardClass = function () {
        if ($scope.archivedStandardButton == true){
            $scope.standardHeadingsClass = "white-color darkgray-background";
            $scope.archivedStandardButtonClass = "btn btn-primary pull-right";
            $scope.archivedStandardButton = false;
        } else {
            $scope.standardHeadingsClass = "white-color blue-background";
            $scope.archivedStandardButtonClass = "btn btn-default pull-right";
            $scope.archivedStandardButton = true;
        }
    };
    $scope.archivedProfileButton = true;
    $scope.profileHeadingsClass = "white-color red-background";
    $scope.archivedProfileButtonClass = "btn btn-default pull-right";
    $scope.changeProfileClass = function () {
        if ($scope.archivedProfileButton == true) {
            $scope.profileHeadingsClass = "white-color darkgray-background";
            $scope.archivedProfileButtonClass = "btn btn-primary pull-right";
            $scope.archivedProfileButton = false;
        } else {
            $scope.profileHeadingsClass = "white-color red-background";
            $scope.archivedProfileButtonClass = "btn btn-default pull-right";
            $scope.archivedProfileButton = true;
        }
    };
    $scope.archivedSupportButton = true;
    $scope.supportHeadingsClass = "white-color green-background";
    $scope.archivedSupportButtonClass = "btn btn-default pull-right";
    $scope.changeSupportClass = function () {
        if ($scope.archivedSupportButton == true) {
            $scope.supportHeadingsClass = "white-color darkgray-background";
            $scope.archivedSupportButtonClass = "btn btn-primary pull-right";
            $scope.archivedSupportButton = false;
        } else {
            $scope.supportHeadingsClass = "white-color green-background";
            $scope.archivedSupportButtonClass = "btn btn-default pull-right";
            $scope.archivedSupportButton = true;
        }
    };


    // Open modal for editing document field
    $scope.editDocumentFieldModal = function(fieldId) {
        $rootScope.currentDocumentField = DocumentField.clone(DocumentField.getById(fieldId));
        $rootScope.shouldBeOpen = true;
        $scope.openModal("app/components/content/administerFields/editFields/editDocumentFieldModal.html", "DocumentFieldModalController");
    };

    // Open modal for creating new document field
    $scope.showNewFieldModal = function () {
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal("app/components/content/administerFields/addFields/newDocumentFieldModal.html", "DocumentFieldModalController");
    };

}]);
