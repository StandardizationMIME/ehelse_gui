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
        $rootScope.selectedDocumentId = documentId;
    };


    $scope.openDocument = function(state, document){
        if(document){
            $scope.selected_document_id = document.id;
        }
        $rootScope.buttonState = state;
        Document.setCurrentDocument(document);
        $rootScope.changeContentView('document');
    };
}]);