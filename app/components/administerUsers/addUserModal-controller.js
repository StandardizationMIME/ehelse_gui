angular.module('ehelseEditor').controller('AddUserModalController', ['$rootScope','$scope', 'close', function( $rootScope, $scope, close) {
    $scope.close = function (result){
        if (result == 'add'){
            $rootScope.postNewTargetGroup();
            close("New TG added!",500);
        }else{
            close("Nothing added",500);
        }
    };
}]);