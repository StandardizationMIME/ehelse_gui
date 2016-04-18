angular.module('ehelseEditor').controller('ConfirmationTGModalController',['$rootScope', '$scope', function($rootScope, $scope){

    $scope.returnTrue = function() {
        $rootScope.deleteTargetGroupById($rootScope.deleteTGId);
    }

}]);
