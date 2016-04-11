angular.module('ehelseEditor').directive('notification',function(){
    return{
        restrict: 'E',
        templateUrl: 'app/components/content/views/notification-view.html'
    };
});
angular.module('ehelseEditor').directive('contentpanel',function(){
    return{
        restrict: 'E',
        templateUrl: 'app/components/content/views/content-panel-view.html'
    };
});

angular.module('ehelseEditor').directive('targetgroup',function () {
    return{
        restrict: 'E',
        templateUrl: 'app/components/content/views/new-document-target-groups.html'
    };
});