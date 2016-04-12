'use strict';

angular.module('ehelseEditor').controller('DocumentController', [ '$scope','$rootScope', function( $scope, $rootScope) {

    $scope.getContent = function(id) {
        $scope.get('standards/' + id + '/versions/', function(data){
            $rootScope.documentVersions = data;
            console.log("getContent");
        }, function(){});

        $scope.get('standards/' + id, function(data){
            $rootScope.document = data;
            $rootScope.view = "documentcontent";
        }, function(){});

        <!-- Makes selected folder bold and toggles folder icon between opened and closed -->
        $(".document-clickable").removeClass('selected');
        $('#standard' + id).addClass('selected');
    };




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


    $scope.openDocument = function(){
        $rootScope.changeContentView('document');
    };
}]);