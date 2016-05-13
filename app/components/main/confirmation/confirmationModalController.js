angular.module("ehelseEditor").controller("ConfirmationModalController",["$rootScope", "$scope", function($rootScope, $scope){

    $scope.returnTrue = function() {
        $rootScope.confirmationFunction();
    }

}]);
