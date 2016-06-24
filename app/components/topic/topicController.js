

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

    $rootScope.toggleTopicIcons = function(topicId){
        var isExpanded = $("#topic" + topicId).attr("aria-expanded");
        var topic = $("#folder" + topicId);
        if(isExpanded == "true"){
            topic.removeClass("glyphicon-folder-open");
            topic.addClass("glyphicon-folder-close");
        }else{
            topic.removeClass("glyphicon-folder-close");
            topic.addClass("glyphicon-folder-open");
        }
    };

    // Set selected topic
    $rootScope.setSelectedTopic = function (topicId, doc) {
        if(topicId){
            $rootScope.selected_topic_id = topicId;
            $rootScope.topic.title = Topic.getById(topicId).title;
            Topic.setSelectedById(topicId);
            if(!doc){
                $rootScope.changeContentView("editTopic");
            }
        }
    };

    // Search filter
    $rootScope.searchOption = "";
    $rootScope.clearSearchFilterText = function () {
        $rootScope.searchQuery = "";
        $rootScope.searchOption = "";
        $rootScope.searchIsFocused = false;
    };
}]);

