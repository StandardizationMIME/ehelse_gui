
"use strict";

angular.module("ehelseEditor").controller("EditDocumentController",
    [ "$scope", "$http","$rootScope", "ModalService", "DocumentType", "TargetGroup", "Mandatory", "Action","Document", "DocumentField","LinkCategory", "Topic","Status",
        function( $scope, $http, $rootScope, ModalService, DocumentType, TargetGroup, Mandatory, Action, Document, DocumentField, LinkCategory, Topic, Status) {

           // Save document values to scope so they can be easily accessed in the html files
            $scope.document_types_option_list = DocumentType.document_types_option_list;
            $scope.target_groups_dict = TargetGroup.getAllAsDict();
            $scope.mandatory_list = Mandatory.getAll();
            $scope.actions_option_list = Action.getAllAsOptionsList();
            $scope.fields_dict = DocumentField.document_fields_dict;
            $scope.document = Document.getCurrentDocument();
            $scope.setCurrentDocumentFieldsByDocumentDocumentTypeId = Document.setCurrentDocumentFieldsByDocumentDocumentTypeId;
            $scope.linkCategories = Document.getCurrentDocumentLinksAsLinkCategoryList();
            $scope.topicTupleList = Topic.getAllAsOptionsList();
            $scope.removeTargetGroup = Document.removeCurrentDocumentTargetGroup;
            $scope.removeField = Document.removeCurrentDocumentField;
            $scope.removeLink = Document.removeCurrentDocumentLink;
            $scope.linkCategoriesDict = LinkCategory.getAllAsDict();
            $scope.removeLinkCategory = Document.removeCurrentDocumentLinksByCategoryId;
            $scope.document_dict = Document.getAllAsDict();
            $scope.status_list = Status.getAll();

            // Submit function used both create new documents and save changes to existing ones
            $scope.submit = function(form){
                Document.submitCurrentDocument();
                form.$setPristine();
            };

            $scope.getFormattedTimestamp = function(timestamp){
                if(timestamp){
                    return {date: timestamp.substring(8,10) + "." + timestamp.substring(5,7) + "." + timestamp.substring(0,4), time: timestamp.substring(11,16)};
                }
            };

            // Delete selected document
            $scope.deleteDocument = function(){
                Document.deleteCurrentDocument();
            };

            // Initialize document with its current links.
            $scope.addLinkToDocument = Document.addLinkToCurrentDocumentByLinkCategoryId;

            // Open modal for adding target groups to the document
            $scope.showAddTargetGroupModal = function () {
                ModalService.showModal({
                    templateUrl: "app/components/content/editDocument/target-groups/addDocumentTargetGroupModal.html",
                    controller: "AddDocumentTargetGroupModelController",
                    animation: false
                }).then(function (modal) {
                    modal.element.modal();
                    modal.close.then(function (result) {
                        console.log(result);
                    });
                });
            };

            // Create a new profile with a relation to selected document
            $scope.newProfile = function(standardId){
                Document.setCurrentDocument(Document.getNewProfile(standardId));
            };

            // Create a new version (clone) of selected document
            $scope.newVersion = function(document){
                $rootScope.selected_document = "";
                Document.setCurrentDocument(Document.newVersion(document));
                $rootScope.notifySuccess("Ny versjon klargjort", 3000);
                $rootScope.setDocumentState('newDocument');
            }
        }
    ]);
