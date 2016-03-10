

angular.module('ehelseEditor').controller('TopicController',['$rootScope', '$scope', function($rootScope, $scope){

    $rootScope.topic = {
        title: "Referansekatalogen"
    };

    $rootScope.reloadTopic = function(topic){
        $scope.flatTopicList[topic.id] = topic;
        if(topic.parent){
            $scope.flatTopicList[topic.parent].children.push(topic);
        }else {
            $rootScope.topics.push(topic);
        }
    };

    $scope.flattenTopicList = function(topicList){
        var flattTopicObject= {};
        for(var i = 0; i < topicList.length; i++){
            flattTopicObject[topicList[i].id] = topicList[i];
            $.extend(flattTopicObject,
                $scope.flattenTopicList(topicList[i].children));
        }
        return flattTopicObject;
    };

    $rootScope.selectedTopicId = "null";

    $rootScope.setSelectedTopicId = function(topicId){
        console.log("topic ", topicId, "selected");
        $rootScope.selectedTopicId = topicId;
    };

    $scope.generateListOfTopicTuple = function(level, parent, topics){
        var paths = [];
        for (var i = 0; i < topics.length; i++) {
            paths.push({
                id: topics[i].id,
                path: parent + "/" + topics[i].title,
                level: level
            });
            Array.prototype.push.apply(paths,$scope.generateListOfTopicTuple(level+1, parent + "/" + topics[i].title, topics[i].children))
        }
        return paths;
    };

    $scope.get('topics/' , function(data){
        $rootScope.topics = data.topics;
        $rootScope.topicTupleList = $scope.generateListOfTopicTuple(1,"", data.topics);
        $rootScope.flatTopicList = $scope.flattenTopicList($rootScope.topics);
        console.log($rootScope.flatTopicList);
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

