angular.module('ehelseEditor').controller('AddUserModalController',function($scope, close) {

    $scope.close = function(result) {
        close(result, 200); // close, but give 200ms for bootstrap to animate
    };


});