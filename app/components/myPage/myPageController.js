"use strict";

angular.module("ehelseEditor").controller("MyPageController", ["$scope", "$rootScope", "$cookies", function ($scope, $rootScope, $cookies) {

    //hide all forms
    $("#nameForm").hide();
    $("#emailForm").hide();
    $("#passwordForm").hide();

    //toggle display functions
    $scope.toggleName = function () {
        $("#nameForm").slideToggle("fast");
        $("#emailForm").slideUp("fast");
        $("#passwordForm").slideUp("fast");

        $("#nameRow").toggleClass("active-row");
        $("#emailRow").removeClass("active-row");
        $("#passwordRow").removeClass("active-row");
    };
    $scope.toggleEmail = function () {
        $("#emailForm").slideToggle("fast");
        $("#nameForm").slideUp("fast");
        $("#passwordForm").slideUp("fast");

        $("#emailRow").toggleClass("active-row");
        $("#nameRow").removeClass("active-row");
        $("#passwordRow").removeClass("active-row");
    };
    $scope.togglePassword = function () {
        $("#passwordForm").slideToggle("fast");
        $("#nameForm").slideUp("fast");
        $("#emailForm").slideUp("fast");

        $("#passwordRow").toggleClass("active-row");
        $("#nameRow").removeClass("active-row");
        $("#emailRow").removeClass("active-row");
    };

    //temporary store values for avoiding live updates when writing in fields
    $scope.myPage = {
        id: $rootScope.currentUser.id,
        name: $rootScope.currentUser.name,
        email: $rootScope.currentUser.email
    };

    //submit all data
    $scope.submit = function () {
        $scope.put(
            "users/" + $rootScope.currentUser.id,
            $scope.myPage,
            function () {
                $rootScope.notifySuccess("Kontoinformasjonen din ble oppdatert",1000);
                $rootScope.currentUser = {
                    id: $rootScope.currentUser.id,
                    name: $scope.myPage.name,
                    email: $scope.myPage.email
                };

                $cookies.put("currentUser", angular.toJson($scope.myPage));
                $rootScope.currentUser.name = $scope.myPage.name;
                $("#emailRow").removeClass("active-row");
                $("#nameRow").removeClass("active-row");
                $("#nameForm").hide();
                $("#emailForm").hide();
            },
            function () {
                $rootScope.notifyError("Kontoinformasjonen din ble ikke oppdatert",6000);
            }
        );
    };

    $scope.changePassword = function () {
        if ($scope.newPassword === $scope.repeatNewPassword) {
            //check if written password equals the account password
            if ($rootScope.password === $scope.oldPassword) {
                $scope.put(
                    "users/" + $rootScope.currentUser.id + "/password/",
                    {password: $scope.newPassword},
                    function () {
                        $rootScope.notifySuccess("Passordet ditt er endret.",1000);
                        $rootScope.password = $scope.newPassword;
                        $("#passwordRow").removeClass("active-row");
                        $("#passwordForm").hide();
                    },
                    function () {
                        $rootScope.notifyError("Passordet ble ikke endret.",3000);
                    }
                );
            } else {
                $rootScope.notifyError("Det gamle passordet er feil.",6000);
            }
        } else {
            $rootScope.notifyError('"Nytt passord" og "Gjenta nytt passord" er ikke like.',6000);
        }
    };
}]);