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
                $cookies.put('currentUser', angular.toJson(data));
                $location.path('/main-view/editor-view').replace();
            },
            function(){
                $rootScope.notifyError("Passord og/eller brukernavn er feil.",12000);
            }
        );

    };
}]);