'use strict';

angular.module('ehelseEditor').controller('DocumentContentController', [ '$scope','$rootScope', function( $scope, $rootScope) {

    if($rootScope.documentVersions){
        $scope.documentVersion = {
            id: $rootScope.documentVersions[$rootScope.documentVersions.length - 1].id
        };
        $scope.selectedDocumentVersion = $rootScope.documentVersions[$rootScope.documentVersions.length - 1];
    }


    $scope.update = function() {
        for(var i = 0; i < $rootScope.documentVersions.length; i++){
            if($scope.documentVersion.id == $rootScope.documentVersions[i].id){
                $scope.selectedDocumentVersion = $rootScope.documentVersions[i];
            }
        }

        console.log($scope.showLinks);
        console.log(foo($scope.selectedDocumentVersion.links.length === 0));

        console.log($scope.selectedDocumentVersion);
    }
}]);