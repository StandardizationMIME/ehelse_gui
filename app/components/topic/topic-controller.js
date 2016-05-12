

angular.module('ehelseEditor').controller('TopicController',['$rootScope', '$scope', "ModalService", 'Topic', function($rootScope, $scope, ModalService, Topic){
    $scope.topics = Topic.getAll();
    $scope.showNewTopicModal = function () {
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal('app/components/topic/addTopic/new-topic-view.html', 'NewTopicModalController');
    };

    $rootScope.topic = {
        title: "Referansekatalogen"
    };

    $rootScope.setSelectedTopic = function (topicId) {
        $rootScope.topic.title = Topic.getById(topicId).title;
        Topic.setSelectedById(topicId);
        $rootScope.changeContentView('editTopic');
    };


}]);

