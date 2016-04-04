angular.module('ehelseEditor').controller('DeleteTargetGroupController', function($scope, close) {
    $scope.close = function (result){
        if (result == 'add'){
            $rootScope.deleteTargetGroup();
            close("New TG added!",500);
        }else{
            close("Nothing added",500);
        }
    };


});