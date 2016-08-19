

angular.module("ehelseEditor").controller("TopicController",["$rootScope", "$scope", "ModalService", "Topic", function($rootScope, $scope, ModalService, Topic){
    $scope.topics = Topic.getAll();

    // Open modal for creating new topic
    $rootScope.showNewTopicModal = function () {
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal("app/components/topic/addTopic/newTopicView.html", "NewTopicModalController");
    };

    // Initialize topic value
    $rootScope.topic = {
        title: "Referansekatalogen"
    };
    /**
     * Handles folder icons view from open to closed and vise versa
     * @param topicId
     */
    $rootScope.toggleTopicIcons = function(topicId){
        var isExpanded = $("#topic" + topicId).attr("aria-expanded");
        var topic = $("#folder" + topicId);
        if(isExpanded == "true"){
            topic.removeClass("fa-folder-open");
            topic.addClass("fa-folder");
        }else{
            topic.removeClass("fa-folder");
            topic.addClass("fa-folder-open");
        }
    };

    /**
     * Sets topic to selected state bu it's id
     * @param topicId
     * @param doc
     */
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

    // Search filter options
    $rootScope.searchOption = "";
    /**
     * Clears search value
     */
    $rootScope.clearSearchFilterText = function () {
        $rootScope.searchQuery = "";
        $rootScope.searchOption = "";
        $rootScope.searchIsFocused = false;
    };
    /**
     * Actions performed when topic gets selected
     * @param topicId
     */
    $rootScope.selectTopicActions = function (topicId) {
        $rootScope.toggleTopicIcons(topicId);
        $rootScope.getDocuments(topicId);
        $rootScope.setSelectedTopic(topicId);
        $rootScope.clearSearchFilterText();
        if($rootScope.childControllers["EditDocumentController"]){
            $rootScope.childControllers["EditorController"].resetForm();
        }
    };
    /**
     * Actions performed when 'new topic' button is clicked
     */
    $rootScope.newTopicActions = function () {
        $rootScope.showNewTopicModal();
        $rootScope.clearSearchFilterText();
        if($rootScope.childControllers["EditDocumentController"]){
            $rootScope.childControllers["EditorController"].resetForm();
        }
    };
    /**
     * Checks document and topic form and prevents loss of unsaved changes
     * @param topicId
     */
    $rootScope.checkDocumentFormAndExecute = function (topicId) {
        if (topicId){
            if ($rootScope.formNotPristine('document')) {
                $rootScope.checkEditTopicForm(topicId, $rootScope.selectTopicActions);
            } else {
                $rootScope.checkEditDocumentForm(topicId, $rootScope.selectTopicActions);
            }
        } else {
            if ($rootScope.formNotPristine('document')) {
                $rootScope.checkEditTopicForm("", $rootScope.newTopicActions);
            } else {
                $rootScope.checkEditDocumentForm("", $rootScope.newTopicActions);
            }
        }
    };
}]);

