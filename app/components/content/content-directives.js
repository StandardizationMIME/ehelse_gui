angular.module('ehelseEditor').directive('notification',function(){
    return{
        restrict: 'E',
        templateUrl: 'app/components/content/views/notification-view.html'
    };
});

angular.module('ehelseEditor').directive('standardfields',function () {
    return{
        restrict: 'E',
        templateUrl: 'app/components/content/administerFields/directives/standard-fields.html'
    };
});

angular.module('ehelseEditor').directive('profilefields',function () {
    return{
        restrict: 'E',
        templateUrl: 'app/components/content/administerFields/directives/profile-fields.html'
    };
});

angular.module('ehelseEditor').directive('supportdocumentfields',function () {
    return{
        restrict: 'E',
        templateUrl: 'app/components/content/administerFields/directives/support-document-fields.html'
    };
});