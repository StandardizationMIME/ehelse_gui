"use strict";

angular.module("ehelseEditor").controller("EditTopicController", [ "$scope","$rootScope", "Topic", "Document", function( $scope, $rootScope, Topic, Document) {

    // // Save topic values to scope so they can be easily accessed in the html files
    $scope.topicTupleList = Topic.getAllAsOptionsList();
    $scope.selectedTopic = Topic.getSelected();


    $scope.$parent.$parent.registerChildController("EditTopicController", $scope);
    $scope.$on('$destroy', function () {
        $scope.$parent.$parent.removeChildController("EditTopicController");
    });

    // Save change
    $scope.saveTopicChange = function(form){
        Topic.submit($scope.selectedTopic);
        form.$setPristine();
    };

    // Delete selected topic
    $rootScope.deleteTopic = function(topic){
        Topic.deleteById(topic.id);
    };

    /**
     * Checks that topic tuple list element is valid
     *
     * Element is not valid if it is child of selected document or element is equal to selected document.
     * @param element
     * @returns {boolean}
     */
    $scope.isValidTopicTupleListElement = function (element) {
        var selected_topic_id = Topic.getSelected().id;
        var current_element_id = element.id;

        if (current_element_id == selected_topic_id)    // current is not child of selected, but this is still invalid
            return false;
        return !Topic.isChildrenOfTopic(current_element_id, selected_topic_id);
    }

}]);