'use strict';

angular.module('ehelseEditor').controller('DocumentController', [ '$scope','$rootScope', 'DocumentType', 'Document', function( $scope, $rootScope, DocumentType, Document) {

    $scope.document_types_dict = DocumentType.document_types_dict;
    $scope.documents = [];
    $scope.selected_document_id = null;

    $rootScope.getDocuments = function(id) {
        $scope.documents = Document.getDocumentsByTopicId(id);


        <!-- Makes selected folder bold and toggles folder icon between opened and closed -->
        $(".clickable").removeClass('selected-item');
        $('#' + id).addClass('selected-item');
        $('#folder' + id).toggleClass('glyphicon-folder-open','glyphicon-folder-close');

    };

    $rootScope.setSelectedDocumentId = function(documentId){
        $rootScope.selected_document_id = documentId;
    };

    $scope.setCurrentStandard = function(standard){
        $rootScope.currentStandard = standard;
    };

    $rootScope.setButtonState = function(state) {
        $rootScope.buttonState = state;

        var documentEdit = $('#document-edit');
        documentEdit.removeClass('new-document edit-document new-profile edit-profile');
        if(state == 'newDocument'){
            documentEdit.addClass('new-document');
        }
        else if(state == 'editDocument'){
            documentEdit.addClass('edit-document');
        }
        else if(state == 'editProfile'){
            documentEdit.addClass('edit-profile');
        }
        else if(state == 'newProfile'){
            documentEdit.addClass('new-profile');
        }

    };

    $scope.checkButtonState = function(document){
        if(document){
            if(document.documentTypeId == 1){
                $rootScope.setButtonState('editDocument');
            }
            else if(document.documentTypeId == 2) {
                $rootScope.setButtonState('editProfile');
            }
            else {
                $rootScope.setButtonState('newDocument');
            }
        }else{
            $rootScope.setButtonState('newDocument');
        }
    };

    $rootScope.openDocument = function(document){
        $scope.checkButtonState(document);

        if(document == "newDocument"){
            document = null;
        }
        Document.setCurrentDocument(document);
        $rootScope.changeContentView('document');

        if(document){

            $scope.selected_document_id = document.id;
            <!-- Make selected profile stand out -->
            $(".profile-container").removeClass('selected-profile');
            $(".profile-icon").removeClass('selected-profile-icon');
            $(".profile" + document.id).addClass('selected-profile');
            $(".profile-icon" + document.id).addClass('selected-profile-icon');

        }
        if($rootScope.buttonState == 'editDocument'){
            $rootScope.relatedProfiles = [];
            var allDocuments = Document.getAllDocuments();
            for (var key in allDocuments) {
                if(allDocuments[key].standardId == document.id) {
                    $rootScope.relatedProfiles.push(allDocuments[key]);
                }
            }
        }
    };
}]);