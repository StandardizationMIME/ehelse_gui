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


    $scope.openDocument = function(document){
        if(document.documentTypeId == 1){
            $rootScope.setButtonState('editDocument');
        }else{
            $rootScope.setButtonState('newDocument');
        }
        Document.setCurrentDocument(document);
        $rootScope.changeContentView('document');

        $(".clickable").removeClass('selectedDocument');
        $('#document' + document.id).addClass('selectedDocument');

        $rootScope.relatedProfiles = [];
        var allDocuments = Document.getAllDocuments();
        for (var key in allDocuments) {
            console.log(allDocuments[key].standardId + "   ---    " + document.id );
            if(allDocuments[key].standardId == document.id) {
                $rootScope.relatedProfiles.push(allDocuments[key]);
            }
        }

    };
}]);