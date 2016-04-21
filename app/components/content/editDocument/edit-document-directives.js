
angular.module('ehelseEditor').directive('documentTargetGroups',function () {
    return{
        restrict: 'E',
        templateUrl: 'app/components/content/editDocument/targetGroups/document-target-groups.html'
    };
});

angular.module('ehelseEditor').directive('documentFields',function () {
    return{
        restrict: 'E',
        templateUrl: 'app/components/content/editDocument/fields/document-fields.html'
    };
});


angular.module('ehelseEditor').directive('documentLinkCategories',function () {
    return{
        restrict: 'E',
        templateUrl: 'app/components/content/editDocument/links/document-links.html'
    };
});
