angular.module('ehelseEditor').controller('AddFieldsController',['$rootScope','$scope', function($rootScope, $scope) {

    $scope.close = function (result){
        if (result == 'add'){
            $rootScope.addDocumentFieldsToNewDoc();
        }else{
            $rootScope.clearSelectedDocumentFields();
        }
    };
}]);