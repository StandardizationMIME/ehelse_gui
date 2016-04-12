angular.module('ehelseEditor').controller('NewDocTGController',['$rootScope','$scope','close', function($rootScope, $scope, close) {
    $scope.close = function (result){
        if (result == 'add'){
            $rootScope.addTGToNewDoc();
            close("New TG added to new doc!",500);
        }else{
            $rootScope.clearSelectedTG();
            close("Nothing added",500);
        }
    };


}]);