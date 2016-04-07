
'use strict';

angular.module('ehelseEditor').controller('NewDocumentController', [ '$scope', '$http','$rootScope', function( $scope, $http, $rootScope) {

    $scope.newDocument = {
        "topicId" : $rootScope.selectedTopicId,
        "title" : "",
        "description" : "",
        "isInCatalog": false,
        "sequence": 3,
        "comment": ""
    };

    $scope.postNewDocument = function(standard){
        var inputUrl = "";
        if($rootScope.documentType == 'profil'){
            inputUrl = 'profile';
        }else if($rootScope.documentType == 'standard'){
            inputUrl = 'standard';
        }

        $scope.post(
            inputUrl + 's/',
            $scope.newDocument,
            function(data){
                console.log("New document created");
                $rootScope.addDocuments(data);
                $rootScope.notifySuccess("Ny standard ble opprettet");
                $rootScope.view = "";
            }
            ,
            function(){
                console.log("New document could not be created");
                $rootScope.notifyError("Standard kunne ikke opprettes");
            }
        );
    }
}]);