angular.module("ehelseEditor")
    .directive("toolbar",function(){
        return{
            restrict: "E",
            templateUrl: "app/components/toolbar/toolbarView.html"
        };
    })
    .directive("editorview",function(){
        return{
            restrict: "E",
            templateUrl: "app/components/editor/editorView.html"
        };
    })
    .directive("notification",function(){
        return{
            restrict: "E",
            templateUrl: "app/components/main/notification/notificationView.html"
        };
    })
    .directive("stringToNumber", function() {
        return {
            require: "ngModel",
            link: function(scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function(value) {
                    return "" + value;
                });
                ngModel.$formatters.push(function(value) {
                    return parseFloat(value, 10);
                });
            }
        }});


