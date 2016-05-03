angular.module('ehelseEditor').controller('ToolbarController',['$rootScope', '$scope', function($rootScope, $scope){

    $scope.$parent.registerChildController('ToolbarController', $scope);

    $scope.openAdministerFields = function(){
      $rootScope.changeContentView('administerfields');
    };

    $scope.openTargetGroups = function(){
      $rootScope.changeContentView('targetgroups');
    };

    $scope.openAdministerActions = function(){
      $rootScope.changeContentView('administeractions');  
    };

    $scope.openAdministerStatus = function(){
      $rootScope.changeContentView('administerstatus');
    };

    $scope.openAdministerLinkCategories = function () {
      $rootScope.changeContentView('administerlinkcategories');
    };
}]);

