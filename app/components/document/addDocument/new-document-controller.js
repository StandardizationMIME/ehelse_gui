
'use strict';

angular.module('ehelseEditor').controller('NewDocumentController', [ '$scope', '$http','$rootScope', 'ModalService', function( $scope, $http, $rootScope, ModalService) {

    $scope.newDocument = {
        "topicId" : $rootScope.selectedTopicId,
        "title" : "",
        "description" : "",
        "sequence": "3",
        "targetGroups": "",
        "status": "",
        "documentType": {
            "id": "1",
            "name": "standard"
        }
    };

    $scope.get(
        'document-types',
        function(data){
            console.log(data);
            $scope.documentTypes = data.documentTypes;
        },
        function(){

        }
    );

    $scope.postNewDocument = function(){
        $scope.post(
            'documents/',
            $scope.newDocument,
            function(data){
                console.log("New document created");
                $rootScope.addDocuments(data);
                $rootScope.notifySuccess("Ny standard ble opprettet");
                $rootScope.view = "";
            }
            ,
            function(){
                console.log("New document could not be created");
                $rootScope.notifyError("Standard kunne ikke opprettes");
            }
        );
    };

    //********** target groups ***********

    $rootScope.targetGroups = [];

    $rootScope.getTargetGroups = function(){
        $scope.get('target-groups/',
            function(data){
                $rootScope.targetGroups = data.targetGroups;
            },function(){});

    };
    $rootScope.getTargetGroups();

    $rootScope.selectedTGNewDoc = {
        groups: []
    };

    $rootScope.clearSelectedTG = function () {
        $rootScope.selectedTGNewDoc.groups = [];
        for (var i = 0; i < $scope.newDocument.targetGroups.length; i++) {
            $rootScope.selectedTGNewDoc.groups.push($scope.newDocument.targetGroups[i]);
        }
    };


    $rootScope.addTGToNewDoc = function () {
        $scope.newDocument.targetGroups = [];
        for (var i = 0; i < $rootScope.selectedTGNewDoc.groups.length; i++) {
            $scope.newDocument.targetGroups.push($rootScope.selectedTGNewDoc.groups[i]);
        }
    };


    // ************** document fields ***************

    $rootScope.selectedDocumentFields = [];

    $rootScope.clearSelectedDocumentFields = function () {
        $rootScope.selectedDocumentFields = [];
        for (var i = 0; i < $scope.newDocument.fields.length; i++) {
            $rootScope.selectedDocumentFields.push($scope.newDocument.fields[i]);
        }
    };


    $rootScope.addDocumentFieldsToNewDoc = function () {
        $scope.newDocument.fields = [];
        for (var i = 0; i < $rootScope.selectedDocumentFields.length; i++) {
            $scope.newDocument.fields.push($rootScope.selectedDocumentFields[i]);
        }
    };


}]);