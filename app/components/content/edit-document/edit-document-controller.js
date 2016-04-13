
'use strict';

angular.module('ehelseEditor').controller('EditDocumentController',
    [ '$scope', '$http','$rootScope', 'ModalService', 'DocumentType', 'TargetGroup', 'Mandatory', 'Action','Document', 'DocumentField',
        function( $scope, $http, $rootScope, ModalService, DocumentType, TargetGroup, Mandatory, Action, Document, DocumentField) {
            $scope.document_types_option_list = DocumentType.document_types_option_list;
            $scope.target_groups_dict = TargetGroup.target_groups_dict;
            $scope.mandatory_option_list = Mandatory.mandatory_option_list;
            $scope.actions_option_list = Action.actions_option_list;
            $scope.fields_dict = DocumentField.document_fields_dict;


            console.log($scope.document);
            $scope.removeTargetGroup = Document.removeTargetGroup;
            $scope.removeField = Document.removeField;

            $scope.submit = Document.submit;


            $scope.showAddTargetGroupModal = function () {
                ModalService.showModal({
                    templateUrl: 'app/components/content/edit-document/target-groups/add-document-target-group-modal.html',
                    controller: 'AddDocumentTargetGroupModelController',
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

            $rootScope.addNewTargetGroupsToDocument = function() {
                $scope.document.targetGroups.push($rootScope.newTargetGroup);
                console.log($scope.document.targetGroups);
            };

        }]);