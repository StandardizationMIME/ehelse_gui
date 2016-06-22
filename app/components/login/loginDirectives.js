
// Directives used in loginView.html
angular.module("ehelseEditor")
    .directive("notification",function(){
        return{
            restrict: "E",
            templateUrl: "app/components/main/notification/notificationView.html"
        };
    });