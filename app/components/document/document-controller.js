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

    $rootScope.setSelectedDocumentId = function(documentId){
        $rootScope.selectedDocumentId = documentId;
    };
}]);