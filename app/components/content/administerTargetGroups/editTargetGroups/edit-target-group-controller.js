angular.module('ehelseEditor').controller('EditTargetGroupController', ['$rootScope','$scope', 'close', function( $rootScope, $scope, close) {
    $scope.close = function (result){
        if (result == 'edit'){
            $rootScope.saveTGChanges($rootScope.editGroup);
            close("Endringene ble gjort",500);
        }else{
            $rootScope.getTargetGroups();
            close("Nothing changed",500);
        }
    };
}]);