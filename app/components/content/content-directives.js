angular.module('ehelseEditor').directive('notification',function(){
    return{
        restrict: 'E',
        templateUrl: 'app/components/content/notification/notification-view.html'
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

angular.module('ehelseEditor').directive('focusMe', function ($timeout, $parse) {
    return{
        link: function (scope, element, attrs, model) {
            var model = $parse(attrs.focusMe);
            scope.$watch(model, function(value) {
                if (value === true ){
                    $timeout(function () {
                        element[0].focus();
                    },150);
                }
            });
            element.bind('blur',function () {
                scope.$apply(model.assign(scope, false));
            })
        }
    };
});