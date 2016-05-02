
'use strict';

angular.module('ehelseEditor').controller('EditDocumentController',
    [ '$scope', '$http','$rootScope', 'ModalService', 'DocumentType', 'TargetGroup', 'Mandatory', 'Action','Document', 'DocumentField','LinkCategory', 'Topic',
        function( $scope, $http, $rootScope, ModalService, DocumentType, TargetGroup, Mandatory, Action, Document, DocumentField, LinkCategory, Topic) {

            $scope.document_types_option_list = DocumentType.document_types_option_list;
            $scope.target_groups_dict = TargetGroup.getAllAsDict();
            $scope.mandatory_option_list = Mandatory.mandatory_option_list;
            $scope.actions_option_list = Action.actions_option_list;
            $scope.fields_dict = DocumentField.document_fields_dict;
            $scope.document = Document.getCurrentDocument();
            $scope.setCurrentDocumentFieldsByDocumentDocumentTypeId = Document.setCurrentDocumentFieldsByDocumentDocumentTypeId;
            $scope.linkCategories = Document.getCurrentDocumentLinksAsLinkCategoryList();
            $scope.topicTupleList = Topic.getAllAsOptionsList();

            $scope.removeTargetGroup = Document.removeCurrentDocumentTargetGroup;
            $scope.removeField = Document.removeCurrentDocumentField;
            $scope.removeLink = Document.removeCurrentDocumentLink;
            $scope.linkCategoriesDict = LinkCategory.getLinkCategoryDict();
            $scope.removeLinkCategory = Document.removeCurrentDocumentLinksByCategoryId;


            $scope.submit = function(form){
                Document.submitCurrentDocument();
                form.$setPristine();
            };

            $scope.deleteDocument = function(){
                Document.deleteCurrentDocument();
            };

            $scope.addLinkToDocument = Document.addLinkToCurrentDocumentByLinkCategoryId;


            $scope.showAddTargetGroupModal = function () {
                ModalService.showModal({
                    templateUrl: 'app/components/content/editDocument/target-groups/add-document-target-group-modal.html',
                    controller: 'AddDocumentTargetGroupModelController',
                    animation: false
                }).then(function (modal) {
                    modal.element.modal();
                    modal.close.then(function (result) {
                        console.log(result);
                    });
                });
            };


            $scope.newProfile = function(standardId){
                Document.setCurrentDocument(Document.getNewProfile(standardId));
            };


        }



    ]);
