'use strict';

angular.module('ehelseEditor').controller('NotificationController', [ '$scope', "$rootScope", function( $scope, $rootScope) {

    $('#feedback-alert').hide();

    $rootScope.notifyTopicSuccess = function(message){
        $scope.notifyMessage(message, 'success');
    };
    $rootScope.notifyTopicError = function(message){
        $scope.notifyMessage(message, 'error');
    };
    $rootScope.notifyStandardSuccess = function(message){
        $scope.notifyMessage(message, 'success');
    };
    $rootScope.notifyStandardError = function(message){
        $scope.notifyMessage(message, 'error');
    };

    $scope.notifyMessage = function(message, type) {

        var notification = $("#notificationMessage");

        notification.removeClass();

        notification.fadeTo(2000, 500).slideUp(500, function() {});

        if(type == "success"){
            notification.addClass('alert alert-success');
        }else if(type == 'error') {
            notification.addClass('alert alert-danger');
        }

        notification.html('<a>' + message + '</a>');
    }
}]);