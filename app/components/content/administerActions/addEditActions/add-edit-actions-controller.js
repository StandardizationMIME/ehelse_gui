angular.module('ehelseEditor').controller('AddEditActionController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.close = function (result){
        if (result == 'add'){
            close("New action added",500);
        }else if (result == 'edit'){
            close("Action changed",500);
        }else{
            close("Canceled",500);
        }
    };
}]);