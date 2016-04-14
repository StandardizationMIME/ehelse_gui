

angular.module('ehelseEditor').controller('TopicController',['$rootScope', '$scope', "ModalService", function($rootScope, $scope, ModalService){

    $rootScope.topic = {
        title: "Referansekatalogen"
    };

    $rootScope.reloadTopic = function(topic){
        $scope.flatTopicList[topic.id] = topic;
        if(topic.parentId){
            $scope.flatTopicList[topic.parentId].children.push(topic);
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

    $rootScope.reloadTopicTupleList = function() {
        $rootScope.topicTupleList = $scope.generateListOfTopicTuple(1,"", $rootScope.topics);
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
        $rootScope.reloadTopicTupleList();
        $rootScope.flatTopicList = $scope.flattenTopicList($rootScope.topics);
    }, function(){});




}]);

