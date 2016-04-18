angular.module('ehelseEditor').controller('ConfirmationModalController',['$rootScope', '$scope', function($rootScope, $scope){

    $scope.returnTrue = function() {
        $rootScope.confirmationValue = true;
        if($rootScope.typeAsString == 'field'){
            $rootScope.deleteFieldById($rootScope.objectToDelete);
        }
    }

}]);
