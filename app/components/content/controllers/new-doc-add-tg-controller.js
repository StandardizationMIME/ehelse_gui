angular.module('ehelseEditor').controller('AddTGNewDoc',['$rootScope','$scope','close', function($rootScope, $scope, close) {

    $scope.close = function (result){
        if (result == 'add'){
            $scope.addNewTG();
            close("New TG added to new doc!",500);
        }else{
            close("Nothing added",500);
        }
    };


}]);