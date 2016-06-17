

angular.module("ehelseEditor").controller("TopicController",["$rootScope", "$scope", "ModalService", "Topic", function($rootScope, $scope, ModalService, Topic){
    $scope.topics = Topic.getAll();

    // Open modal for creating new topic
    $scope.showNewTopicModal = function () {
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal("app/components/topic/addTopic/newTopicView.html", "NewTopicModalController");
    };

    // Initialize topic value
    $rootScope.topic = {
        title: "Referansekatalogen"
    };

    // Set selected topic
    $rootScope.setSelectedTopic = function (topicId, doc) {
        if(topicId){
            $rootScope.topic.title = Topic.getById(topicId).title;
            Topic.setSelectedById(topicId);
            if(!doc){
                $rootScope.changeContentView("editTopic");
            }
        }
    };


}]);

