
'use strict';

angular.module('ehelseEditor').controller('EditDocumentController',
    [ '$scope', '$http','$rootScope', 'ModalService', 'DocumentType', 'TargetGroup', 'Mandatory',
        function( $scope, $http, $rootScope, ModalService, DocumentType, TargetGroup, Mandatory) {
            $scope.document_types_option_list = DocumentType.document_types_option_list;
            $scope.target_groups_dict = TargetGroup.target_groups_dict;
            $scope.mandatory_option_list = Mandatory.mandatory_option_list;

            $scope.document = {
                "topicId" : $rootScope.selectedTopicId,
                "title" : "",
                "description" : "",
                "sequence": 3,
                "comment": "",
                "targetGroups": [
                    {
                        "id": 1,
                        "description": "",
                        "actionId": "",
                        "deadline": "",
                        "mandatoryId": "",
                        "targetGroupId": 1
                    }
                ]
            };


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

            $scope.showNewDocTGModal = function () {
                console.log($scope.document_types);
                ModalService.showModal({
                    templateUrl: 'app/components/content/edit-document/target-groups/new-doc-tg-modal.html',
                    controller: 'NewDocTGController',
                    animation: false
                }).then(function (modal) {
                    modal.element.modal();
                    modal.close.then(function (result) {
                        console.log(result);
                    });
                });
            };

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

            $scope.showAddTG = function () {
                ModalService.showModal({
                    templateUrl: 'app/components/content/edit-document/target-groups/new-doc-tg-modal.html',
                    controller: 'AddTGNewDoc',
                    animation: false
                }).then(function (modal) {
                    modal.element.modal();
                    modal.close.then(function (result) {
                        console.log(result);
                    });
                });
            };

            $rootScope.newTargetGroup = {
                "id": "",
                "description": "test",
                "actionId": "",
                "deadline": "",
                "mandatoryId": "",
                "targetGroupId": ""
            };

            $rootScope.addNewTG = function() {
                $scope.newDocument.targetGroups.push($rootScope.newTargetGroup);
                console.log($scope.newDocument.targetGroups);
            };

        }]);