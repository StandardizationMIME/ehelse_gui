

'use strict';

angular.module('ehelseEditor').controller('ContentController', [ '$scope', '$http','$rootScope', function( $scope, $rootScope) {

    $scope.postNewStandard = function(standard){



        var content = {
            title: standard.title,
            description: standard.description,
            is_in_catalog: standard.isInCatalog,
            parent: 1,    //placeholder values to test if it works
            sequence: 1,
            topic_id: 12
        };

        $scope.post(
            'standards/',
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