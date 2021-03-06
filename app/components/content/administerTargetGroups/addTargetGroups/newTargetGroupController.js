angular.module("ehelseEditor").controller("NewTargetGroupController", ["$rootScope","$scope", "close", "TargetGroup", function( $rootScope, $scope, close, TargetGroup) {

    // Save target group values to scope for easier access in the html files
    $scope.TGTuples = TargetGroup.getAllAsOptionsList();
    $scope.newTargetGroup = TargetGroup.new();

    // Close modal and/or create new target group
    $scope.close = function (result){
        if (result == "add"){
            TargetGroup.submit($scope.newTargetGroup);
            close("New TG added!",500);
        }else{
            close("Nothing added",500);
        }
    };
}]);