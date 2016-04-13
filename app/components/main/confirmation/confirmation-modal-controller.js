angular.module('ehelseEditor').controller('ConfirmationModalController',['$rootScope', '$scope', function($rootScope, $scope){

    $scope.returnTrue = function() {
        $rootScope.confirmationValue = true;
        $rootScope.deleteFieldById($rootScope.deleteId);
        console.log($rootScope.confirmationValue);
    }

}]);
