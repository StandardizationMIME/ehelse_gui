"use strict";

angular.module("ehelseEditor").controller("AdministerFieldsController", ["$scope", "$rootScope", "DocumentField", function ($scope, $rootScope, DocumentField) {

    // Save document field values to scope for easier access in the html files
    $scope.documentFields = DocumentField.document_fields;

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
    $scope.archivedProfileButton = true;
    $scope.archivedSupportButton = true;
    $scope.standardListHeadingsClass = "field-item field-list-title panel1";
    $scope.showArchivedActiveClass = "btn btn-default pull-right";
    $scope.changeClass = function () {
        if ($scope.archivedStandardButton == true){
            $scope.standardListHeadingsClass = "field-item field-list-title panel4";
            $scope.showArchivedActiveClass = "btn btn-primary pull-right";
            $scope.archivedStandardButton = false;
        } else {
            $scope.standardListHeadingsClass = "field-item field-list-title panel1";
            $scope.showArchivedActiveClass = "btn btn-default pull-right";
            $scope.archivedStandardButton = true;
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
        console.log("showNewFieldModal?");
    };
    
}]);