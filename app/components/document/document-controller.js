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

    $scope.openDocument = function(document){
        Document.setCurrentDocument(document);
        $rootScope.changeContentView('document');

        $(".clickable").removeClass('selectedDocument');
        $('#document' + document.id).addClass('selectedDocument');

    };
}]);