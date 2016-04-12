'use strict';

angular.module('ehelseEditor').controller('NewTopicModalController', [ '$scope', "$rootScope", "ModalService", function($scope, $rootScope, ModalService) {

    $scope.newTopic = {
        "title" : "",
        "description" : "",
        "isInCatalog": false,
        "parentId": $scope.selectedTopicId,
        "sequence": 1,
        "comment": ""
    };

    $rootScope.postNewTopic = function(topic){
        console.log("postNewTopic kjører");

        if(topic.parentId == "null"){
            topic.parentId = null;
        }

        $scope.post(
            'topics/',
            topic,
            function(data){
                console.log("New topic created");
                console.log(data);
                console.log($scope.newTopic);
                $rootScope.reloadTopic(data);
                $rootScope.notifySuccess("Nytt tema har blitt opprettet", 3000);
                $rootScope.reloadTopicTupleList();
            }
            ,
            function(){
                console.log("New topic could not be created");
                $rootScope.notifyError("Tema ble ikke opprettet", 5000);
            }
        );
    };
}]);