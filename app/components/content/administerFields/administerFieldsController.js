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
                console.log("Successfully deleted field");
                $rootScope.notifySuccess("Felt ble slettet!", 1000);
            },
            function(){
            }
        );
    };

    // Get document field
    $scope.getDocumentFieldById = function (id) {
        DocumentField.getFieldById(
            id,
            function(data){
                if(data.mandatory == "0"){
                    data.mandatory = false;
                }else if(data.mandatory == "1"){
                    data.mandatory = true;
                }
                $rootScope.currentDocumentField = data;
            },
            function(){
                console.log("error");
            }
        );
    };

    // Open modal for editing document field
    $scope.editDocumentFieldModal = function(fieldId) {
        $scope.getDocumentFieldById(fieldId);
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