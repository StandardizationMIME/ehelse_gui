"use strict";

angular.module("ehelseEditor").controller("LoginController", [ "$scope", "$rootScope", "$location", "$cookies", "$state", "FileUpload", function( $scope, $rootScope, $location, $cookies, $state, FileUpload) {

    $scope.feedback = "";
    $rootScope.password = null;
    $scope.$state = $state;

    // Submit login info and try to log in
    $scope.submit = function(){
        $rootScope.setUserName($scope.username);
        $rootScope.setPassword($scope.password);
        $cookies.put("username", $scope.username);
        $cookies.put("password", $scope.password);
        $scope.logIn();
    };

    // Login
    $scope.logIn = function (username, authtoken) {
        $rootScope.get(
            "users/login/",
            function(data){
                $rootScope.currentUser = data;
                $cookies.put("currentUser", angular.toJson(data));
                $scope.$state.go("main-view.editor-view");
            },
            function(){
                $scope.feedback = "Passord og/eller brukernavn er feil";
                $scope.password = null;
            }
        );

    };

    // Read file in file upload input
    $scope.readFileContent = function ($fileContent) {
        FileUpload.readContent($fileContent);
    };

}]);