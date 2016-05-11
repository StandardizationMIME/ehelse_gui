'use strict';

angular.module('ehelseEditor').controller('DocumentController', [ '$scope','$rootScope', 'DocumentType', 'Document', function( $scope, $rootScope, DocumentType, Document) {

    $scope.document_types_dict = DocumentType.document_types_dict;
    $scope.documents = [];
    $scope.current_document = Document.getCurrentDocument();

    $rootScope.getDocuments = function(id) {
        $scope.documents = Document.getDocumentsByTopicId(id);


        <!-- Makes selected folder bold and toggles folder icon between opened and closed -->
        $(".clickable").removeClass('selected-item');
        $('#' + id).addClass('selected-item');
        $('#folder' + id).toggleClass('glyphicon-folder-open','glyphicon-folder-close');


    };

     $rootScope.setButtonState = function(state) {
        $rootScope.buttonState = state;
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

    $rootScope.openDocumentById = function(id){
        $rootScope.openDocument(Document.getById(id));
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

    };
}]);