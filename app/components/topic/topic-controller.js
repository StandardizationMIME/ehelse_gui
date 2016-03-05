angular.module('ehelseEditor').controller('TopicController',['$rootScope', '$scope', '$http', function($rootScope, $scope, $http){

    $scope.topic = {
        title: "Referansekatalogen"
    };

    $scope.get('topics/' , function(data){
        $rootScope.topics = data.topics;
        $rootScope.topicList = generateTopicList("", data.topics);
        console.log($rootScope.topics);

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

