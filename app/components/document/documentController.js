"use strict";

angular.module("ehelseEditor").controller("DocumentController", ["$scope", "$rootScope", "DocumentType", "Document", "Topic","DocumentField", function ($scope, $rootScope, DocumentType, Document, Topic, DocumentField) {

    // Save document values to scope to easier access it in the html files
    $scope.document_types_dict = DocumentType.document_types_dict;
    $scope.documents = [];
    $scope.current_document = Document.getCurrentDocument();
    $scope.allDocuments = Document.getAll();

    // Get documents of the selected topic
    $rootScope.getDocuments = function (id, document) {
        $scope.documents = Document.getDocumentsByTopicId(id);
        $rootScope.setSelectedTopic(id, document);
        if (document) {
            $rootScope.selected_document = document;
        } else {
            $rootScope.selected_document = "";
        }
    };


    // Set the document state to toggle different aspects of the view
    $rootScope.setDocumentState = function (state) {
        $rootScope.documentState = state;
    };

    // Check and update the value of documentState
    $rootScope.checkDocumentState = function (document) {
        if (document) {
            if (document.documentTypeId == "1") {
                if($rootScope.documentState == 'hideProfilesFromProfile' ||
                    $rootScope.documentState == 'hideProfilesFromStandard' ||
                    $rootScope.documentState == 'hideProfilesFromNewProfile'){
                    $rootScope.setDocumentState('hideProfilesFromStandard')
                }else{
                    $rootScope.setDocumentState("editDocument");
                }
            }
            else if (document.documentTypeId == "2") {
                if($rootScope.documentState == 'hideProfilesFromProfile' ||
                    $rootScope.documentState == 'hideProfilesFromStandard' ||
                    $rootScope.documentState == 'hideProfilesFromNewProfile'){
                    $rootScope.setDocumentState('hideProfilesFromProfile')
                }else{
                    $rootScope.setDocumentState("editProfile");
                }
            }
            else if (document.documentTypeId == "3") {
                $rootScope.setDocumentState("editUtility");
            }
            else {
                $rootScope.setDocumentState("newDocument");
            }
        } else {
            $rootScope.setDocumentState("newDocument");
        }
    };
    $rootScope.documentChanges = function (document) {
        $rootScope.checkDocumentState(document);
        $rootScope.openDocument(document);
        $rootScope.resetDocumentScroll();
        if($rootScope.childControllers["EditDocumentController"]){
            $rootScope.childControllers["EditorController"].resetForm();
        }
    };
    $rootScope.searchChanges = function (document) {
        $rootScope.checkDocumentState(document);
        $rootScope.openDocument(document);
        $rootScope.resetDocumentScroll();
        if($rootScope.childControllers["EditDocumentController"]){
            $rootScope.childControllers["EditorController"].resetForm();
        }
    };
    $rootScope.newDocChanges = function () {
        $rootScope.checkDocumentState(document);
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
        if ($rootScope.formNotPristine('document')) {
            $rootScope.checkEditTopicForm("", $rootScope.newDocChanges);
        } else {
            $rootScope.checkEditDocumentForm("", $rootScope.newDocChanges);
        }
    };
    $rootScope.checkIfDocumentFormIsDirtyAndNotificate = function (document) {
        if ($rootScope.formNotPristine('document')) {
            $rootScope.checkEditTopicForm(document, $rootScope.documentChanges);
        } else {
            $rootScope.checkEditDocumentForm(document, $rootScope.documentChanges);
        }
    };
    $rootScope.checkIfSearchFormIsDirtyAndNotificate = function (document) {
        if ($rootScope.formNotPristine('document')) {
            $rootScope.checkEditTopicForm(document, $rootScope.searchChanges);
        } else {
            $rootScope.checkEditDocumentForm(document, $rootScope.searchChanges);
        }
    };
    $rootScope.checkIfNewProfileFormIsDirty = function (documentId) {
        if ($rootScope.formNotPristine('document')) {
            $rootScope.checkEditTopicForm(documentId, $rootScope.newProfileActions);
        } else {
            $rootScope.checkEditDocumentForm(documentId, $rootScope.newProfileActions);
        }
    };
    $rootScope.checkIfBackToDocumentFormIsDirty = function (documentId) {
        if ($rootScope.formNotPristine('document')) {
            $rootScope.checkEditTopicForm(documentId, $rootScope.backToDocumentActions);
        } else {
            $rootScope.checkEditDocumentForm(documentId, $rootScope.backToDocumentActions);
        }
    };
    $rootScope.checkIfSelectProfileFormIsDirty = function (profile) {
        if ($rootScope.formNotPristine('document')) {
            $rootScope.checkEditTopicForm(profile, $rootScope.selectProfileActions);
        } else {
            $rootScope.checkEditDocumentForm(profile, $rootScope.selectProfileActions);
        }
    };

    // Open document by id
    $rootScope.openDocumentById = function (id) {
        $rootScope.openDocument(Document.getById(id));
    };

    $rootScope.toggleSelectedTopic = function () {
        Document.toggleTopicSelection();
    };

    $rootScope.resetDocumentScroll = function () {
        $("#editDocument").scrollTop(0);
    };

    // Open selected document
    $rootScope.openDocument = function (document) {

        // Check that document is not defined (when a new os being created) and that to topic is selected.
        if (!document && !Object.keys(Topic.getSelected()).length) {
            $rootScope.notifyError("Kan ikke opprette et dokument uten å ha velgt et tema.", 6000);
        } else {
            $rootScope.selected_document = document;
            $rootScope.checkDocumentState(document);
            Document.setCurrentDocument(document);


            if (document && document.decidedBy) {
                $rootScope.additionalFieldForMandatoryGroupsSelected = true;
            } else {
                $rootScope.additionalFieldForMandatoryGroupsSelected = false;
            }
            $rootScope.changeContentView("document");
            if($rootScope.childControllers["EditDocumentController"]){
                $rootScope.childControllers["EditorController"].resetForm();
            }
        }
    };

    $scope.filterContainsSearchText = function (document) {
        if (document.hisNumber) {
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