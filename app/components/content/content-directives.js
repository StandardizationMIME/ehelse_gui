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

angular.module('ehelseEditor').directive('documentfields',function () {
    return{
        restrict: 'E',
        templateUrl: 'app/components/content/views/new-document-fields.html'
    };
});

angular.module('ehelseEditor').directive('standardfields',function () {
    return{
        restrict: 'E',
        templateUrl: 'app/components/content/views/standard-fields.html'
    };
});

angular.module('ehelseEditor').directive('profilefields',function () {
    return{
        restrict: 'E',
        templateUrl: 'app/components/content/views/profile-fields.html'
    };
});

angular.module('ehelseEditor').directive('supportdocumentfields',function () {
    return{
        restrict: 'E',
        templateUrl: 'app/components/content/views/support-document-fields.html'
    };
});