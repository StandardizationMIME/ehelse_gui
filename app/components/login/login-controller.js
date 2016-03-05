'use strict';

angular.module('ehelseEditor')

    .controller('LoginController',
        ['$scope', '$rootScope', '$location', '$http',
            function ($scope, $rootScope, $location, $http, AuthenticationService) {

                $scope.login = function () {
                    console.log('login');
                    $scope.dataLoading = true;
                    $http.defaults.headers.common['Authorization'] = 'Basic ' +  $scope.username + ':' + $scope.password;
                    console.log($http.defaults.headers.common['Authorization']);

                    $http.post('http://refkat.eu/v1/topics/', {username : username, password: password})
                        .success(function(response){
                            alert(response);
                        });

                };
            }]);