'use strict';

angular.module('ehelseEditor').controller('AdministerActionController',['$scope', '$rootScope', 'Action', function($scope, $rootScope, Action){

    $scope.showNewActionModal = function () {
        $rootScope.shouldBeOpen = true;
    }

    $scope.actions_option_list = Action.actions_option_list;
}]);
