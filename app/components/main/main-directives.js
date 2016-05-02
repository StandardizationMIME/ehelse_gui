angular.module('ehelseEditor').directive('toolbar',function(){
    return{
        restrict: 'E',
        templateUrl: 'app/components/toolbar/toolbar-view.html'
    };
});

angular.module('ehelseEditor').directive('editorview',function(){
    return{
        restrict: 'E',
        templateUrl: 'app/components/editor/editor-view.html'
    };
});

angular.module('ehelseEditor').directive('notification',function(){
    return{
        restrict: 'E',
        templateUrl: 'app/components/main/notification/notification-view.html'
    };
});

