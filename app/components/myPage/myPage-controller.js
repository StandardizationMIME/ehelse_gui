'use strict';

angular.module('ehelseEditor').controller('MyPageController', ['$scope', '$rootScope', function ($scope, $rootScope) {

    //hide all forms
    $("#nameForm").hide();
    $("#emailForm").hide();
    $("#passwordForm").hide();
    $("#imageForm").hide();

    //toggle display functions
    $scope.toggleName = function () {
        $("#nameForm").slideToggle( "fast");
        $("#emailForm").slideUp("fast");
        $("#passwordForm").slideUp("fast");
        $("#imageForm").slideUp("fast");

        $("#nameRow").toggleClass("activeRow");
        $("#emailRow").removeClass("activeRow");
        $("#passwordRow").removeClass("activeRow");
        $("#imageRow").removeClass("activeRow");

    };
    $scope.toggleEmail = function () {
        $("#emailForm").slideToggle( "fast");
        $("#nameForm").slideUp("fast");
        $("#passwordForm").slideUp("fast");
        $("#imageForm").slideUp("fast");

        $("#emailRow").toggleClass("activeRow");
        $("#nameRow").removeClass("activeRow");
        $("#passwordRow").removeClass("activeRow");
        $("#imageRow").removeClass("activeRow");
    };
    $scope.togglePassword = function () {
        $("#passwordForm").slideToggle( "fast");
        $("#nameForm").slideUp("fast");
        $("#emailForm").slideUp("fast");
        $("#imageForm").slideUp("fast");

        $("#passwordRow").toggleClass("activeRow");
        $("#nameRow").removeClass("activeRow");
        $("#emailRow").removeClass("activeRow");
        $("#imageRow").removeClass("activeRow");
    };
    $scope.toggleImage = function () {
        $("#imageForm").slideToggle( "fast");
        $("#nameForm").slideUp("fast");
        $("#passwordForm").slideUp("fast");
        $("#emailForm").slideUp("fast");

        $("#imageRow").toggleClass("activeRow");
        $("#nameRow").removeClass("activeRow");
        $("#emailRow").removeClass("activeRow");
        $("#passwordRow").removeClass("activeRow");
    };

    $scope.submitName = function(){
        alert("submit name");
    };
    $scope.submitEmail = function(){
        alert("submit email");
    };
    $scope.submitPassword = function(){
        alert("submit password");
    };
    $scope.submitImage = function(){
        alert("submit image");
    };

}]);