angular.module('ehelseEditor').controller('ConfirmationTGModalController',['$rootScope', '$scope', 'TargetGroup', function($rootScope, $scope, TargetGroup){

    $scope.returnTrue = function() {
        TargetGroup.deleteById($rootScope.deleteTGId);
    }

}]);
