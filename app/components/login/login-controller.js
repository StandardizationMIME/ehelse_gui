'use strict';

angular.module('ehelseEditor').controller('LoginController', [ '$scope', '$rootScope', '$location',  function( $scope, $rootScope, $location) {

    $scope.submit = function(){
        $rootScope.setUserName($scope.username);
        $rootScope.setPassword($scope.password);
        $scope.logIn();
    };

    $scope.logIn = function (username, authtoken) {

        $rootScope.get(
            'login/',
            function(data){
                console.log(data);
                if (data.authenticated === true){
                    $location.path('/main-view').replace();
                }else{
                    $scope.password = '';
                }
            },
            function(){}
        );

    };
}]);