'use strict';

angular.module('ehelseEditor').controller('DocumentFieldModalController', [ '$scope', "$rootScope", "ModalService", function($scope, $rootScope, ModalService) {

    $scope.submitDocumentFieldChange = function(field) {
        console.log($rootScope.documentFields);
        for (var i = 0; i < $rootScope.documentFields.length; i++){
            if($rootScope.documentFields[i].id == field.id){
                $rootScope.documentFields[i] = field;
            }
        }
        console.log($rootScope.documentFields);
    };

    //$rootScope.submitDocumentFieldChange = function(field){
    //    $scope.put(
    //        'documentFields/' +field.id,
    //        field,
    //        function(data){
    //            console.log("Field has been edited");
    //            console.log(data);
    //            console.log(field);
    //            $rootScope.notifySuccess("Endring har blitt lagret", 5000);
    //        }
    //        ,
    //        function(){
    //            console.log("Error: Change could not be saved.");
    //            $rootScope.notifyError("Error: Endring ble ikke lagret!");
    //        }
    //    );
    //};

    $scope.postNewDocumentField = function(field) {
        var myField = {
            'id': field.id,
            'title': field.title,
            'description': field.description,
            'sequence': 1,
            'fieldType': {
                'id': 0,
                'type': 'string'
            },
            'mandatory': field.mandatory
        };
        $rootScope.documentFields[$rootScope.documentFields.length] = myField;
        $rootScope.notifyStandardSuccess('Nytt felt ble opprettet!')
    };

    //$rootScope.postNewDocumentField() = function(field){
    //    $scope.post(
    //        'documentFields/',
    //        field,
    //        function(data){
    //            console.log("Field has been created");
    //            console.log(data);
    //            console.log(field);
    //            $rootScope.notifySuccess("Felt har blitt opprettet", 5000);
    //        }
    //        ,
    //        function(){
    //            console.log("Error: Field could not be created.");
    //            $rootScope.notifyError("Error: Felt ble ikke opprettet!");
    //        }
    //    );
    //};

}]);