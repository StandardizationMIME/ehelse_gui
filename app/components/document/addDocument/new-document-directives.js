
angular.module('ehelseEditor').directive('targetgroup',function () {
    return{
        restrict: 'E',
        templateUrl: 'app/components/document/addDocument/addTargetGroupsToDocument/new-document-target-groups.html'
    };
});

angular.module('ehelseEditor').directive('documentfields',function () {
    return{
        restrict: 'E',
        templateUrl: 'app/components/document/addDocument/addFieldsToDocument/new-document-fields.html'
    };
});
