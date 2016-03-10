'use strict';

angular.module('ehelseEditor').controller('NewTopicController', [ '$scope', "$rootScope", function( $scope, $rootScope) {

    $scope.newTopic = {
        "title" : "",
        "description" : "",
        "isInCatalog": false,
        "parent": $scope.selectedTopicId,
        "sequence": 1
    };

    $scope.postNewTopic = function(topic){

        console.log(topic);
        $scope.post(
            'topics/',
            $scope.newTopic,
            function(data){
                console.log("New topic created");
                console.log(data);
                $rootScope.reloadTopic(data);
                $rootScope.view = "";
            }
            ,
            function(){
                console.log("New topic could not be created")
            }
        );
    };
}]);