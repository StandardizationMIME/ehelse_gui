"use strict";

angular.module("ehelseEditor").controller("NewTopicModalController", [ "$scope", "$rootScope","Topic", function($scope, $rootScope, Topic) {

    // Save topic values to scope to get easier access to it in the html files
    $scope.topicTupleList = Topic.getAllAsOptionsList();

    // Initialize topic values
    $scope.newTopic = {
        "title" : "",
        "description" : "",
        "parentId": Topic.getSelected().id,
        "sequence": 1
    };

    // Create and post topic
    $rootScope.postNewTopic = function(topic){
        if (Topic.getTopicLevel(topic) > $rootScope.max_topic_levels) {
            $rootScope.notifyError("Kan ikke opprette mer enn " + $rootScope.max_topic_levels + " nivåer for tema.", 6000);
        } else {
            Topic.submit(topic);
        }
    };
}]);