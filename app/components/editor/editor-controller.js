'use strict';

angular.module('ehelseEditor').controller('EditorController', [ '$scope', function( $scope) {
    $scope.changeView = function(view) {
        $scope.view = view;
    };

    $scope.cancelContentBrowser = function(){
        $scope.changeView("");
    };
}]);