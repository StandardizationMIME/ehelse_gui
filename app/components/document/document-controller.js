'use strict';

angular.module('ehelseEditor').controller('DocumentController', [ '$scope','$rootScope', 'DocumentType', 'Document', function( $scope, $rootScope, DocumentType, Document) {

    $scope.document_types_dict = DocumentType.document_types_dict;
    $scope.documents = [];

    

    $rootScope.getDocuments = function(id) {
        $scope.documents = Document.getDocumentsByTopicId(id);


        <!-- Makes selected folder bold and toggles folder icon between opened and closed -->
        $(".clickable").removeClass('selectedTopic');
        $('#' + id).addClass('selectedTopic');
        $('#folder' + id).toggleClass('glyphicon-folder-open','glyphicon-folder-close');

    };


    $rootScope.setSelectedDocumentId = function(documentId){
        $rootScope.selectedDocumentId = documentId;
    };

    $scope.setCurrentStandard = function(standard){
        $rootScope.currentStandard = standard;
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

        Document.setCurrentDocument(document);
        $rootScope.changeContentView('document');

        $(".clickable").removeClass('selectedDocument');
        $('#document' + document.id).addClass('selectedDocument');

        <!-- Make selected profile stand out -->
        $(".profile-container").removeClass('selected-profile');
        $(".profile-icon").removeClass('selected-profile-icon');
        $(".profile" + document.id).addClass('selected-profile');
        $(".profile-icon" + document.id).addClass('selected-profile-icon');

        if($rootScope.buttonState == 'editDocument'){
            $rootScope.relatedProfiles = [];
            var allDocuments = Document.getAllDocuments();
            for (var key in allDocuments) {
                console.log(allDocuments[key].standardId + "   ---    " + document.id );
                if(allDocuments[key].standardId == document.id) {
                    $rootScope.relatedProfiles.push(allDocuments[key]);
                }
            }
        }

    };
}]);