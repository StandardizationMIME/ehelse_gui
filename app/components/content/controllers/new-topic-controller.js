'use strict';

angular.module('ehelseEditor').controller('NewTopicController', [ '$scope', "$rootScope", function( $scope, $rootScope) {

    $scope.newTopic = {
        "title" : "",
        "description" : "",
        "isInCatalog": false,
        "parentId": $scope.selectedTopicId,
        "sequence": 1,
        "comment": ""
    };

    $scope.postNewTopic = function(topic){

        if(topic.parent == "null"){
            topic.parent = null;
        }

        $scope.post(
            'topics/',
            $scope.newTopic,
            function(data){
                console.log("New topic created");
                console.log(data);
                console.log($scope.newTopic);
                $rootScope.reloadTopic(data);
                $rootScope.notifyTopicSuccess("Nytt tema har blitt opprettet");
                $rootScope.view = "";
                $rootScope.reloadTopicTupleList();

            }
            ,
            function(){
                console.log("New topic could not be created");
                $rootScope.notifyTopicError("Tema ble ikke opprettet");
            }
        );
    };
}]);