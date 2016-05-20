angular.module("ehelseEditor").controller("EditTargetGroupController",
    ["$rootScope","$scope", "close", "TargetGroup", function( $rootScope, $scope, close, TargetGroup) {

        // Save target group value to scope for easier access in the html files
        $scope.TGTuples = TargetGroup.getAllAsOptionsList();

        // Close modal and submit target group change
        $scope.close = function (result){
            if (result == "edit"){
                TargetGroup.submit($rootScope.editGroup);
            }else{
                close("Nothing changed",500);
            }
        };
}]);