"use strict";

angular.module("ehelseEditor").controller("AdministerFieldsController", ["$scope", "$rootScope", "DocumentField", function ($scope, $rootScope, DocumentField) {

    $scope.documentFields = DocumentField.document_fields;

    $rootScope.setTypeId = function(number){
        $rootScope.typeId = number;
    };

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

    $scope.editDocumentFieldModal = function(fieldId) {
        $scope.getDocumentFieldById(fieldId);
        $rootScope.shouldBeOpen = true;
        $scope.openModal("app/components/content/administerFields/editFields/editDocumentFieldModal.html", "DocumentFieldModalController");
    };




    $scope.sortableOptions = {
        cancel: ".unsortable",
        items: "li:not(.unsortable)",
        stop: function (e, ui) {
            var listItems = ui.item.context.parentNode.querySelectorAll("li");
            for (var i = 0; i < listItems.length; i++) {
                listItems[i].querySelectorAll("input")[0].value = i + 1;
            }
        },
        axis: "y"
    };


    $scope.showNewFieldModal = function () {
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal("app/components/content/administerFields/addFields/newDocumentFieldModal.html", "DocumentFieldModalController");
        console.log("showNewFieldModal?");
    };
    
}]);