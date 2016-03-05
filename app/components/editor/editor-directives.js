angular.module('ehelseEditor').directive('topicview', function(){
    return{
        restrict: 'E',
        templateUrl: 'app/components/topic/topic-view.html'
    };
});

angular.module('ehelseEditor').directive('documentview', function(){
    return{
        restrict: 'E',
        templateUrl: 'app/components/document/document-view.html'
    };
});

angular.module('ehelseEditor').directive('contentview', function(){
    return{
        restrict: 'E',
        templateUrl: 'app/components/content/views/content-view.html'
    };
});