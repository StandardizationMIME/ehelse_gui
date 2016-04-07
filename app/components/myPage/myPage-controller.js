'use strict';

angular.module('ehelseEditor').controller('MyPageController', ['$scope', '$rootScope', function ($scope, $rootScope) {

    //hide all forms
    $("#nameForm").hide();
    $("#emailForm").hide();
    $("#passwordForm").hide();
    $("#imageForm").hide();

    //toggle display functions
    $scope.toggleName = function () {
        $("#nameForm").slideToggle("fast");
        $("#emailForm").slideUp("fast");
        $("#passwordForm").slideUp("fast");
        $("#imageForm").slideUp("fast");

        $("#nameRow").toggleClass("activeRow");
        $("#emailRow").removeClass("activeRow");
        $("#passwordRow").removeClass("activeRow");
        $("#imageRow").removeClass("activeRow");
    };
    $scope.toggleEmail = function () {
        $("#emailForm").slideToggle("fast");
        $("#nameForm").slideUp("fast");
        $("#passwordForm").slideUp("fast");
        $("#imageForm").slideUp("fast");

        $("#emailRow").toggleClass("activeRow");
        $("#nameRow").removeClass("activeRow");
        $("#passwordRow").removeClass("activeRow");
        $("#imageRow").removeClass("activeRow");
    };
    $scope.togglePassword = function () {
        $("#passwordForm").slideToggle("fast");
        $("#nameForm").slideUp("fast");
        $("#emailForm").slideUp("fast");
        $("#imageForm").slideUp("fast");

        $("#passwordRow").toggleClass("activeRow");
        $("#nameRow").removeClass("activeRow");
        $("#emailRow").removeClass("activeRow");
        $("#imageRow").removeClass("activeRow");
    };
    $scope.toggleImage = function () {
        $("#imageForm").slideToggle("fast");
        $("#nameForm").slideUp("fast");
        $("#passwordForm").slideUp("fast");
        $("#emailForm").slideUp("fast");

        $("#imageRow").toggleClass("activeRow");
        $("#nameRow").removeClass("activeRow");
        $("#emailRow").removeClass("activeRow");
        $("#passwordRow").removeClass("activeRow");
    };

    $scope.myPage = {
        id: $rootScope.currentUser.id,
        name: $rootScope.currentUser.name,
        email: $rootScope.currentUser.email,
        profileImage: $rootScope.currentUser.profileImage
    };
    $scope.submit = function () {
        $scope.put(
            "users/" + $rootScope.currentUser.id,
            $scope.myPage,
            function () {
                $rootScope.notifySuccess("Kontoinformasjonen din ble oppdatert");
                $rootScope.currentUser = {
                    id: $rootScope.currentUser.id,
                    name: $scope.myPage.name,
                    email: $scope.myPage.email,
                    profileImage: $scope.myPage.profileImage
                };
            },
            function () {
                $rootScope.notifyTopicError("Kontoinformasjonen din ble ikke oppdatert");
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
                        $rootScope.notifySuccess("Passordet ditt er endret.",6000);
                        $rootScope.password = $scope.newPassword;
                    },
                    function () {
                        $rootScope.notifyTopicError("Passordet ble ikke endret.",6000);
                    }
                );
            } else {
                $rootScope.notifyTopicError("Det gamle passordet er feil.",6000);
            }
        } else {
            $rootScope.notifyTopicError('"Nytt passord" og "Gjenta nytt passord" er ikke like.',6000);
        }

        //Clear fields after attempt
        /* TODO implement clearing of password fields after attempt. ATM that breaks the form becayse of 2-way data binding.
         $scope.oldPassword = "";
         $scope.newPassword = "";
         $scope.repeatNewPassword = "";
         */
    };

    console.log("mypage-ctrl",$rootScope.currentUser);

}]);