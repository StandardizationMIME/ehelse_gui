'use strict';

angular.module('ehelseEditor').controller('EditTopicController', [ '$scope','$rootScope', 'Topic', function( $scope, $rootScope, Topic) {
    $scope.topicTupleList = Topic.getAllAsOptionsList();
    $scope.selectedTopic = Topic.getSelected();
    $scope.saveTopicChange = function(){
        Topic.submit($scope.selectedTopic);
    };

    $rootScope.deleteTopic = function(topic){
        Topic.deleteById(topic.id);
    };

}]);