"use strict";

angular.module("ehelseEditor").controller("LoginController", [ "$scope", "$rootScope", "$location", "$cookies", "$state", "ModalService", function( $scope, $rootScope, $location, $cookies, $state, ModalService) {

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

    //reset password modal
    $scope.openForgotPasswordModal = function () {
        ModalService.showModal({
            templateUrl: "app/components/login/forgotPassword/forgotPasswordModalView.html",
            controller: "ForgotPasswordModalController"
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                console.log(result);

                /*
                if(result != "cancel"){
                    $rootScope.post("/users/reset-password/",{"email":result},function(){
                        console.log("success");

                    },function(){
                        console.log("failed");

                    });
                }
                */




                console.log("Siste linje");
            });
        });
    };


}]);