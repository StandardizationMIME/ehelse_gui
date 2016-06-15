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

    // Open confirmation if topic can be deleted (does not contain subtopics or documents)
    $rootScope.openTopicConfirmationModal = function(message, topic, method) {
        var documents = Document.getDocumentsByTopicId(topic.id);
        if (topic.children.length || documents.length) {
            console.log("Error: could not delete topic because it is not empty");
            $rootScope.notifyError("Error: Kan ikke slette temaer som ikke er tomme!", 6000);
        } else {
            $rootScope.openConfirmationModal(message, topic, method);
        }
    };

    // Delete selected topic
    $rootScope.deleteTopic = function(topic){
        Topic.deleteById(topic.id);
    };

}]);