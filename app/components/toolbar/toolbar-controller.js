angular.module('ehelseEditor').controller('ToolbarController',['$rootScope', '$scope', function($rootScope, $scope){

    $scope.$parent.registerChildController('ToolbarController', $scope);

    $scope.openAdministerFields = function(){
      $rootScope.changeContentView('administerfields');
    };

    $scope.openTargetGroups = function(){
      $rootScope.changeContentView('targetgroups');
    };

}]);

