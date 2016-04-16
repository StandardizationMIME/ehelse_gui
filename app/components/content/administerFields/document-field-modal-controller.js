'use strict';

angular.module('ehelseEditor').controller('DocumentFieldModalController', [ '$scope', "$rootScope", function($scope, $rootScope) {

    $rootScope.submitDocumentFieldChange = function(field){

        var mandatoryString = null;
        if(field.mandatory){
            mandatoryString = '1';
        }else{
            mandatoryString = '0';
        }

        var myField = {
            "id": field.id,
            "name": field.name,
            "description": field.description,
            "sequence": "1",
            "mandatory": mandatoryString,
            "documentTypeId": $rootScope.typeId
        };
        $scope.put(
            'document-fields/' + field.id,
            myField,
            function(data){
                console.log("Field has been edited");
                console.log(data);
                console.log(field);
                $rootScope.notifySuccess("Endring har blitt lagret", 5000);
                $rootScope.updateDocumentFieldsList();
            }
            ,
            function(){
                console.log("Error: Change could not be saved.");
                $rootScope.notifyError("Error: Endring ble ikke lagret!", 5000);
            }
        );
    };

    $scope.postNewDocumentField = function(field){
        var mandatoryString = null;
        if(field.mandatory){
            mandatoryString = '1';
        }else{
            mandatoryString = '0';
        }

        var myField = {
            "id": "",
            "name": field.name,
            "description": field.description,
            "sequence": "1",
            "mandatory": mandatoryString,
            "documentTypeId": $rootScope.typeId
        };

        $scope.post(
            'document-fields/',
            myField,
            function(data){
                console.log("Field has been created");
                console.log(data);
                console.log(myField);
                $rootScope.notifySuccess("Felt har blitt opprettet", 5000);
                $rootScope.updateDocumentFieldsList();
            }
            ,
            function(){
                console.log("Error: Field could not be created.");
                $rootScope.notifyError("Error: Felt ble ikke opprettet!", 5000);
            }
        );
    };

}]);