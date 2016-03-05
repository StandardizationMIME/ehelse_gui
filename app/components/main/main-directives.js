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

