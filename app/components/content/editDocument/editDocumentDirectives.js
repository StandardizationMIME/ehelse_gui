
angular.module('ehelseEditor').directive('documentTargetGroups',function () {
    return{
        restrict: 'E',
        templateUrl: 'app/components/content/editDocument/targetGroups/documentTargetGroups.html'
    };
});

angular.module('ehelseEditor').directive('documentFields',function () {
    return{
        restrict: 'E',
        templateUrl: 'app/components/content/editDocument/fields/documentFields.html'
    };
});


angular.module('ehelseEditor').directive('documentLinkCategories',function () {
    return{
        restrict: 'E',
        templateUrl: 'app/components/content/editDocument/links/documentLinks.html'
    };
});
