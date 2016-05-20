angular.module("ehelseEditor").controller("ConfirmationModalController",["$rootScope", "$scope", function($rootScope, $scope){

    // If true is returned, run function
    $scope.returnTrue = function() {
        $rootScope.confirmationFunction();
    }

}]);
