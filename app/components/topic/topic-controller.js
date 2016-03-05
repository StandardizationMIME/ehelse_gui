angular.module('ehelseEditor').controller('TopicController', function($scope, $http){

    $scope.topic = {
        title: "Referansekatalogen"
    };

    $scope.get('topics/' , function(data){
        $scope.topics = data.topics;
        $scope.topicList = generateTopicList("", data.topics);
        console.log($scope.topics);

    }, function(){});

    $scope.getStandards = function(id) {
        $scope.get('topics/' + id , function(data){
            $scope.standards = data.documents;
            $scope.topic = data;

        }, function(){});

        <!-- Makes selected folder bold and toggles folder icon between opened and closed -->
        $(".clickable").removeClass('selected');
        $('#' + id).addClass('selected');
        $('#folder' + id).toggleClass('glyphicon-folder-open','glyphicon-folder-close');
    };


});

