angular.module("ehelseEditor").controller("NewTargetGroupController", ["$rootScope","$scope", "close", "TargetGroup", function( $rootScope, $scope, close, TargetGroup) {
    $scope.TGTuples = TargetGroup.getAllAsOptionsList();
    $scope.newTargetGroup = TargetGroup.new();
    $scope.close = function (result){
        if (result == "add"){
            TargetGroup.submit($scope.newTargetGroup);
            close("New TG added!",500);
        }else{
            close("Nothing added",500);
        }
    };
}]);