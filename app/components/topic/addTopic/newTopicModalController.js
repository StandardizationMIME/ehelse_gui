"use strict";

angular.module("ehelseEditor").controller("NewTopicModalController", [ "$scope", "$rootScope","Topic", function($scope, $rootScope, Topic) {

    // Save topic values to scope to get easier access to it in the html files
    $scope.topicTupleList = Topic.getAllAsOptionsList();

    // Initialize topic values
    $scope.newTopic = {
        "title" : "",
        "description" : "",
        "isInCatalog": false,
        "parentId": Topic.getSelected().id,
        "sequence": 1,
        "comment": ""
    };

    // Create and post topic
    $rootScope.postNewTopic = function(topic){
        Topic.submit(topic);
    };
}]);