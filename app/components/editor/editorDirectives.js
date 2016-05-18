
// Directives used in editorView.html
angular.module("ehelseEditor").directive("topicview", function(){
    return{
        restrict: "E",
        templateUrl: "app/components/topic/topicView.html"
    };
});

angular.module("ehelseEditor").directive("documentview", function(){
    return{
        restrict: "E",
        templateUrl: "app/components/document/documentView.html"
    };
});

angular.module("ehelseEditor").directive("contentview", function(){
    return{
        restrict: "E",
        templateUrl: "app/components/content/contentView.html"
    };
});