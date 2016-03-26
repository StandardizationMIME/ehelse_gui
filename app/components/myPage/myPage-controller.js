'use strict';

angular.module('ehelseEditor').controller('MyPageController', ['$scope', '$rootScope', function ($scope, $rootScope) {

    //hide all forms
    $("#nameForm").hide();
    $("#emailForm").hide();
    $("#passwordForm").hide();
    $("#imageForm").hide();

    //toggle display functions
    $scope.toggleName = function () {
        $("#nameForm").toggle();
        $("#emailForm").hide();
        $("#passwordForm").hide();
        $("#imageForm").hide();
    };
    $scope.toggleEmail = function () {
        $("#emailForm").toggle();
        $("#nameForm").hide();
        $("#passwordForm").hide();
        $("#imageForm").hide();
    };
    $scope.togglePassword = function () {
        $("#passwordForm").toggle();
        $("#nameForm").hide();
        $("#emailForm").hide();
        $("#imageForm").hide();
    };
    $scope.toggleImage = function () {
        $("#imageForm").toggle();
        $("#nameForm").hide();
        $("#passwordForm").hide();
        $("#emailForm").hide();
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