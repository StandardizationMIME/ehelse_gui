

'use strict';

angular.module('ehelseEditor').controller('ContentController', [ '$scope', '$http','$rootScope', function( $scope, $rootScope) {

    $scope.postNewTopic = function(topic){

        var content = {
            title: topic.title,
            description: topic.description,
            isInCatalog: topic.isInCatalog,
            parent: topic.parent
        };

        $scope.post(
            'topics/',
            content,
            function(){
                console.log("New topic created");
                console.log(content);
                $rootScope.view = "";
            }
            ,
            function(){
                console.log("New topic could not be created")
            }
        );
    };

    $scope.postNewStandard = function(standard){

        var content = {
            title: standard.title,
            description: standard.description,
            isInCatalog: standard.isInCatalog,
            parent: standard.parent
        };

        $scope.post(
            'topics/',
            content,
            function(){
                console.log("New document created");
                console.log(content);
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