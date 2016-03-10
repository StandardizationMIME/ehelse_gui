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

        $scope.post(
            'topics/',
            $scope.newTopic,
            function(){
                console.log("New topic created");
                console.log($scope.newTopic);
                $rootScope.notifyTopicSuccess("Ny standard har blitt opprettet");
                $rootScope.view = "";
            }
            ,
            function(){
                console.log("New topic could not be created")
                $rootScope.notifyTopicError("Standard ble ikke oppretet");
            }
        );
    };
}]);