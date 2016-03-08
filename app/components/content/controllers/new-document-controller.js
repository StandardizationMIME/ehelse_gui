

'use strict';

angular.module('ehelseEditor').controller('NewDocumentController', [ '$scope', '$http','$rootScope', function( $scope, $http, $rootScope) {

    $scope.newDocument = {
        "topicId" : $rootScope.selectedTopicId,
        "title" : "",
        "description" : "",
        "isInCatalog": false,
        "sequence": 3
    };

    console.log($rootScope.selectedTopicId);
    console.log($scope.newDocument);

    $scope.postNewStandard = function(standard){
        console.log($scope.newDocument);

        $scope.post(
            'standards/',
            $scope.newDocument,
            function(){
                console.log("New document created");
                console.log($scope.view);
                $rootScope.view = "";
            }
            ,
            function(){
                console.log("New document could not be created")
            }
        );
    }
}]);