'use strict';

angular.module('ehelseEditor').controller('EditorController', [ '$scope', '$rootScope', function($scope, $rootScope) {


    $scope.$parent.registerChildController('EditorController', $scope);

    $scope.changeView = function(view, type) {
        $rootScope.view = view;
        $rootScope.documentType = type;
    };

    $scope.cancelContentBrowser = function(){
        $rootScope.view = "";
    };

}]);