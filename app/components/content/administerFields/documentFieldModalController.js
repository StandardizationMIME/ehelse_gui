"use strict";

angular.module("ehelseEditor").controller("DocumentFieldModalController", [ "$scope", "$rootScope","DocumentField", function($scope, $rootScope, DocumentField) {

    $rootScope.submitDocumentFieldChange = function(field){
        DocumentField.edit(
            field,
            function(data){
                console.log("Field has been edited");
                console.log(data);
                console.log(field);
                $rootScope.notifySuccess("Endring har blitt lagret", 1000);
            },
            function(){
                console.log("Error: Change could not be saved.");
                $rootScope.notifyError("Error: Endring ble ikke lagret!", 6000);
            }
        );
    };



    $scope.postNewDocumentField = function(field){
        DocumentField.create(field,
            function(data){
                console.log("Field has been created");
                console.log(data);
                $rootScope.notifySuccess("Felt har blitt opprettet", 1000);
            },
            function(){
                console.log("Error: Field could not be created.");
                $rootScope.notifyError("Error: Felt ble ikke opprettet!", 6000);
            });
    };

}]);