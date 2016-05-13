'use strict';

angular.module('ehelseEditor').controller('NewTopicModalController', [ '$scope', "$rootScope",'Topic', function($scope, $rootScope, Topic) {
    $scope.topicTupleList = Topic.getAllAsOptionsList();
    $scope.newTopic = {
        "title" : "",
        "description" : "",
        "isInCatalog": false,
        "parentId": Topic.getSelected().id,
        "sequence": 1,
        "comment": ""
    };

    $rootScope.postNewTopic = function(topic){
        Topic.submit(topic);
    };
}]);