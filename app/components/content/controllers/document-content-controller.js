'use strict';

angular.module('ehelseEditor').controller('DocumentContentController', [ '$scope','$rootScope', function( $scope, $rootScope) {
    $scope.document = {
        "title" : "placeholder",
        "description" : "placeholder"
    };
}]);