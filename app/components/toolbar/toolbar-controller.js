angular.module('ehelseEditor').controller('ToolbarController',['$state','$rootScope', '$scope', function($state,$rootScope, $scope){
    $scope.$parent.registerChildController('ToolbarController', $scope);

    $scope.$state = $state;
}]);

