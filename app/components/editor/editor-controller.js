'use strict';

angular.module('ehelseEditor').controller('EditorController', [ '$scope', '$rootScope', function($scope, $rootScope) {


    $scope.$parent.registerChildController('EditorController', $scope);

    $scope.changeView = function(view) {
        $rootScope.view = view;
    };

    $scope.cancelContentBrowser = function(){
        $rootScope.view = "";
    };
}]);