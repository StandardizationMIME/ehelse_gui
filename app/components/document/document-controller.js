'use strict';

angular.module('ehelseEditor').controller('DocumentController', [ '$scope','$rootScope', 'DocumentType', 'Document', function( $scope, $rootScope, DocumentType, Document) {

    $scope.document_types_dict = DocumentType.document_types_dict;


    <!-- Makes selected folder bold and toggles folder icon between opened and closed -->
    //$(".document-clickable").removeClass('selected');
    //$('#standard' + id).addClass('selected');




    $rootScope.addDocuments = function(document){
        $rootScope.documents.push(document);
    };

    $rootScope.getDocuments = function(id) {
        $scope.get('topics/' + id , function(data){
            $rootScope.documents = data.documents;
            $rootScope.topic = data;

        }, function(){});

        <!-- Makes selected folder bold and toggles folder icon between opened and closed -->
        $(".clickable").removeClass('selected');
        $('#' + id).addClass('selected');
        $('#folder' + id).toggleClass('glyphicon-folder-open','glyphicon-folder-close');

    };

    $rootScope.setSelectedDocumentId = function(documentId){
        $rootScope.selectedDocumentId = documentId;
    };


    $scope.openDocument = function(document){
        Document.setDocument(document);
        $rootScope.changeContentView('document');
        $rootScope.setDocument(Document.getDocument());
    };
}]);