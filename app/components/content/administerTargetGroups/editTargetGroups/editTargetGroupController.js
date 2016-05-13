angular.module("ehelseEditor").controller("EditTargetGroupController",
    ["$rootScope","$scope", "close", "TargetGroup", function( $rootScope, $scope, close, TargetGroup) {
        $scope.TGTuples = TargetGroup.getAllAsOptionsList();
    $scope.close = function (result){
        if (result == "edit"){
            TargetGroup.submit($rootScope.editGroup);
        }else{
            close("Nothing changed",500);
        }
    };
}]);