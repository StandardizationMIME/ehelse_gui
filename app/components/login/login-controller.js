'use strict';

angular.module('ehelseEditor').controller('LoginController', [ '$scope', '$rootScope', '$location', '$cookies', function( $scope, $rootScope, $location, $cookies) {

    $scope.submit = function(){
        $rootScope.setUserName($scope.username);
        $rootScope.setPassword($scope.password);
        $cookies.put('username', $scope.username);
        $cookies.put('password', $scope.password);
        $scope.logIn();
    };

    $scope.logIn = function (username, authtoken) {

        $rootScope.get(
            'users/login/',
            function(data){
                $rootScope.currentUser = data;
                $cookies.put('currentUser', data);
                $location.path('/main-view').replace();
            },
            function(){}
        );

    };
}]);