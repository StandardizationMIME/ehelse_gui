angular.module('ehelseEditor').controller('DeleteTargetGroupController',['$rootScope','$scope','close', function($rootScope, $scope, close) {
    $scope.close = function (result){
        if (result == 'delete'){
            $rootScope.deleteTargetGroup();
            close("New TG added!",500);
        }else{
            close("Nothing added",500);
        }
    };


}]);