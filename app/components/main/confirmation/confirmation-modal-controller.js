angular.module('ehelseEditor').controller('ConfirmationModalController',['$rootScope', '$scope', function($rootScope, $scope){

    $scope.returnTrue = function() {
        $rootScope.confirmationValue = true;
        $rootScope.deleteFieldById($rootScope.objectToDelete);
        console.log($rootScope.confirmationValue);
    }

}]);
