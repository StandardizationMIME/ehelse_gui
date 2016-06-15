"use strict";

angular.module("ehelseEditor").controller("EditTopicController", [ "$scope","$rootScope", "Topic", "Document", function( $scope, $rootScope, Topic, Document) {

    // // Save topic values to scope so they can be easily accessed in the html files
    $scope.topicTupleList = Topic.getAllAsOptionsList();
    $scope.selectedTopic = Topic.getSelected();

    // Save change
    $scope.saveTopicChange = function(form){
        Topic.submit($scope.selectedTopic);
        form.$setPristine();
    };

    // Delete selected topic
    $rootScope.deleteTopic = function(topic){
        Topic.deleteById(topic.id);
    };

}]);