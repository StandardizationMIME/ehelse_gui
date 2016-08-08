"use strict";

angular.module("ehelseEditor").controller("DocumentController", [ "$scope","$rootScope", "DocumentType", "Document", "Topic", function( $scope, $rootScope, DocumentType, Document, Topic) {

    // Save document values to scope to easier access it in the html files
    $scope.document_types_dict = DocumentType.document_types_dict;
    $scope.documents = [];
    $scope.current_document = Document.getCurrentDocument();
    $scope.allDocuments = Document.getAll();

    // Get documents of the selected topic
    $rootScope.getDocuments = function(id, document) {
        $scope.documents = Document.getDocumentsByTopicId(id);
        $rootScope.setSelectedTopic(id, document);
        if(document){
            $rootScope.selected_document = document;
        }else{
            $rootScope.selected_document = "";
        }
    };

    // Makes selected folder bold and toggles folder icon between opened and closed
    /*$rootScope.toggleSelectedTopic = function(id) {
        $(".clickable").removeClass("selected-item");
        if(id){
            $("#" + id).addClass("selected-item");
            $("#folder" + id).toggleClass("glyphicon-folder-open","glyphicon-folder-close");
        }
    };*/

    // Set the document state to toggle different aspects of the view
     $rootScope.setDocumentState = function(state) {
        $rootScope.documentState = state;
    };

    // Check and update the value of documentState
    $rootScope.checkDocumentState = function(document){
        if(document){
            if(document.documentTypeId == "1"){
                $rootScope.setDocumentState("editDocument");
            }
            else if(document.documentTypeId == "2") {
                $rootScope.setDocumentState("editProfile");
            }
            else if(document.documentTypeId == "3"){
                $rootScope.setDocumentState("editUtility");
            }
            else {
                $rootScope.setDocumentState("newDocument");
            }
        }else{
            $rootScope.setDocumentState("newDocument");
        }
    };
    $rootScope.documentChanges = function (document) {
        $rootScope.setDocumentState('editDocument');
        $rootScope.openDocument(document);
        $rootScope.resetDocumentScroll();
        if($rootScope.childControllers["EditDocumentController"]){
            $rootScope.childControllers["EditorController"].resetForm();
        }
    };
    $rootScope.searchChanges = function (document) {
        $rootScope.setDocumentState('editDocument');
        $rootScope.openDocument(document);
        $rootScope.resetDocumentScroll();
        if($rootScope.childControllers["EditDocumentController"]){
            $rootScope.childControllers["EditorController"].resetForm();
        }
    };
    $rootScope.newDocChanges = function () {
        $rootScope.setDocumentState('newDocument');
        $rootScope.openDocument();
        $rootScope.resetDocumentScroll();
        $rootScope.clearSearchFilterText();
        if($rootScope.childControllers["EditDocumentController"]){
            $rootScope.childControllers["EditorController"].resetForm();
        }
    };
    $rootScope.newProfileActions = function (documentId) {
        $rootScope.setDocumentState('newProfile');
        $rootScope.newProfile(documentId);
        $rootScope.resetDocumentScroll();
        if($rootScope.childControllers["EditDocumentController"]){
            $rootScope.childControllers["EditorController"].resetForm();
        }
    };
    $rootScope.backToDocumentActions = function(documentId){
        $rootScope.setDocumentState('editDocument');
        $rootScope.openDocumentById(documentId);
        $rootScope.toggleSelectedTopic();
        $rootScope.resetDocumentScroll();
        if($rootScope.childControllers["EditDocumentController"]){
            $rootScope.childControllers["EditorController"].resetForm();
        }
    };
    $rootScope.selectProfileActions = function (profile) {
        $rootScope.setDocumentState('editProfile');
        $rootScope.openDocument(profile);
        $rootScope.toggleSelectedTopic();
        $rootScope.resetDocumentScroll();
        if($rootScope.childControllers["EditDocumentController"]){
            $rootScope.childControllers["EditorController"].resetForm();
        }
    };
    $rootScope.checkIfNewDocFormIsDirtyAndNotificate = function () {
        $rootScope.checkEditDocumentForm("", $rootScope.newDocChanges);
    };
    $rootScope.checkIfDocumentFormIsDirtyAndNotificate = function (document) {
        $rootScope.checkEditDocumentForm(document, $rootScope.documentChanges);
    };
    $rootScope.checkIfSearchFormIsDirtyAndNotificate = function (document) {
        $rootScope.checkEditDocumentForm(document, $rootScope.searchChanges);
    };
    $rootScope.checkIfNewProfileFormIsDirty = function (documentId) {
        $rootScope.checkEditDocumentForm(documentId, $rootScope.newProfileActions);
    };
    $rootScope.checkIfBackToDocumentFormIsDirty = function (documentId) {
        $rootScope.checkEditDocumentForm(documentId, $rootScope.backToDocumentActions);
    };
    $rootScope.checkIfSelectProfileFormIsDirty = function (profile) {
        $rootScope.checkEditDocumentForm(profile, $rootScope.selectProfileActions);
    };

    // Open document by id
    $rootScope.openDocumentById = function(id){
        $rootScope.openDocument(Document.getById(id));
    };

    $rootScope.toggleSelectedTopic = function(){
        Document.toggleTopicSelection();
    };

    $rootScope.resetDocumentScroll = function(){
        $("#editDocument").scrollTop(0);
    };

    // Open selected document
    $rootScope.openDocument = function(document){



        // Check that document is not defined (when a new os being created) and that to topic is selected.
        if(!document && !Object.keys(Topic.getSelected()).length) {
            $rootScope.notifyError("Kan ikke opprette et dokument uten å ha velgt et tema.", 6000);
        } else {
            $rootScope.selected_document = document;
            $rootScope.checkDocumentState(document);
            Document.setCurrentDocument(document);


            if (document && document.decidedBy){
                $rootScope.additionalFieldForMandatoryGroupsSelected = true;
            } else {
                $rootScope.additionalFieldForMandatoryGroupsSelected = false;
            }
            $rootScope.changeContentView("document");
        }
    };

    $scope.filterContainsSearchText = function(document) {
        if (document.hisNumber){
            return document.title.toLowerCase().indexOf($rootScope.searchQuery) >= 0
                || document.hisNumber.toLowerCase().indexOf($rootScope.searchQuery) >= 0
                || document.internalId.toLowerCase().indexOf($rootScope.searchQuery) >= 0
                || document.title.indexOf($rootScope.searchQuery) >= 0
                || document.hisNumber.indexOf($rootScope.searchQuery) >= 0
                || document.internalId.indexOf($rootScope.searchQuery) >= 0;
        } else {
            return document.title.toLowerCase().indexOf($rootScope.searchQuery) >= 0
                || document.internalId.toLowerCase().indexOf($rootScope.searchQuery) >= 0
                || document.title.indexOf($rootScope.searchQuery) >= 0
                || document.internalId.indexOf($rootScope.searchQuery) >= 0;
        }

    };
}]);