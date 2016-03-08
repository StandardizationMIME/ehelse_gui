angular.module('ehelseEditor').controller('TopicController',['$rootScope', '$scope', function($rootScope, $scope){

    $rootScope.topic = {
        title: "Referansekatalogen"
    };

    $rootScope.selectedTopicId = null;

    $rootScope.setSelectedTopicId = function(topicId){
        console.log("topic ", topicId, "selected");
        $rootScope.selectedTopicId = topicId;
    };

    $scope.get('topics/' , function(data){
        $rootScope.topics = data.topics;
        $rootScope.topicList = generateTopicList("", data.topics);
    }, function(){});

    $scope.getStandards = function(id) {
        $scope.get('topics/' + id , function(data){
            $rootScope.standards = data.documents;
            $rootScope.topic = data;

        }, function(){});

        <!-- Makes selected folder bold and toggles folder icon between opened and closed -->
        $(".clickable").removeClass('selected');
        $('#' + id).addClass('selected');
        $('#folder' + id).toggleClass('glyphicon-folder-open','glyphicon-folder-close');
    };


}]);

