"use strict";

angular.module("ehelseEditor").controller("ForgotPasswordController", ["$scope", "$rootScope", function($scope,$rootScope){

    $scope.feedback = "";

    //get new password sent to email
    $scope.submit = function(email){
        console.log("this fn");

        var tempEmail = ""+email;

        $rootScope.post("/users/reset-password/",{"email": tempEmail},function(){
            //$scope.feedback = "Nytt passord ble sendt til "+email+".";
            console.log("success");
        },function(){
            console.log("fail");
            //$scope.feedback = "Det oppstod en feil.";
        });

    };

}]);