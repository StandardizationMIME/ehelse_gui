angular.module("ehelseEditor").controller("ConfirmationTGModalController",["$rootScope", "$scope", "TargetGroup", function($rootScope, $scope, TargetGroup){

    // If true is returned, delete target group
    $scope.returnTrue = function() {
        TargetGroup.deleteById($rootScope.deleteTGId);
    }

}]);
