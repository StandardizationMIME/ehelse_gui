
angular.module('ehelseEditor').directive('documentTargetGroups',function () {
    return{
        restrict: 'E',
        templateUrl: 'app/components/content/edit-document/target-groups/document-target-groups.html'
    };
});

angular.module('ehelseEditor').directive('documentFields',function () {
    return{
        restrict: 'E',
        templateUrl: 'app/components/content/edit-document/fields/document-fields.html'
    };
});
