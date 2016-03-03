/**
 * Created by ARAGORN on 29.02.2016.
 */

'use strict';

angular.module('Authentication')

.controller('LoginController',
    ['$scope', '$rootScope', '$location', '$http', 'AuthenticationService',
        function ($scope, $rootScope, $location, $http, AuthenticationService) {
            // reset login status
            AuthenticationService.ClearCredentials();

            $scope.Login = function () {
                console.log('login');
                $scope.dataLoading = true;
                $http.defaults.headers.common['Authorization'] = 'Basic ' +  $scope.username + ':' + $scope.password;
                console.log($http.defaults.headers.common['Authorization']);

                $http.post('http://refkat.eu/v1/topics/', {username : username, password: password})
                    .success(function(response){
                        alert(response);
                    });

                //AuthenticationService.Login($scope.username, $scope.password, function (response) {
                //    if (response.success) {
                //        AuthenticationService.SetCredentials($scope.username, $scope.password);
                //        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
                //        console.log($http.defaults.headers.common['Authorization']);
                //        $location.path('/');
                //    } else {
                //        $scope.error = response.message;
                //        $scope.dataLoading = false;
                //    }
                //});
            };
        }]);