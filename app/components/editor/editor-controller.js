'use strict';

angular.module('ehelseEditor').controller('EditorController', [ '$scope', '$rootScope', function($rootScope, $scope) {
    $scope.changeView = function(view) {
        $rootScope.view = view;
    };

    $scope.cancelContentBrowser = function(){
        $rootScope.view = "";
    };
}]);