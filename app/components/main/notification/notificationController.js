"use strict";

angular.module("ehelseEditor").controller("NotificationController", [ "$scope", "$rootScope", function( $scope, $rootScope) {

    // Make sure the toast is hidden
    $("#feedback-alert").hide();

    // Notify the user of successful event
    $rootScope.notifySuccess = function(message, time){
        $scope.notifyMessage('<span class="fa fa-check-circle-o" style="font-size: 25px;"></span>  ' + message, "success", time);
    };

    // Notify the user of errors
    $rootScope.notifyError = function(message, time){
        $scope.notifyMessage('<span class="fa fa-ban" style="font-size: 25px;"></span>  ' + message, "error", time);
    };


    // Creating and displaying the toast
    $scope.notifyMessage = function(message, type, time) {

        var notification = $("#notification-message");

        notification.removeClass();

        notification.fadeTo(time, 500).slideUp(500, function() {});

        if(type == "success"){
            notification.addClass("alert alert-success");
        }else if(type == "error") {
            notification.addClass("alert alert-danger");
        }

        notification.html("<a>" + message + "</a>");
    }
}]);