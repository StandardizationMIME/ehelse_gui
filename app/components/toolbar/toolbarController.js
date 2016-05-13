angular.module("ehelseEditor").controller("ToolbarController", ["$state", "$rootScope", "$scope", function ($state, $rootScope, $scope) {
    $scope.$parent.registerChildController("ToolbarController", $scope);
    $scope.deselectTopicAndDocument = function(){
        $rootScope.toggleSelectedTopic("");
        $rootScope.getDocuments("");
        $rootScope.selected_document = "";
    };

    $scope.openAdministerFields = function () {
        $scope.deselectTopicAndDocument();
        $rootScope.changeContentView("administerfields");
    };

    $scope.openTargetGroups = function () {
        $scope.deselectTopicAndDocument();
        $rootScope.changeContentView("targetgroups");
    };

    $scope.openAdministerActions = function () {
        $scope.deselectTopicAndDocument();
        $rootScope.changeContentView("administeractions");
    };

    $scope.openAdministerStatus = function () {
        $scope.deselectTopicAndDocument();
        $rootScope.changeContentView("administerstatus");
    };

    $scope.openAdministerLinkCategories = function () {
        $scope.deselectTopicAndDocument();
        $rootScope.changeContentView("administerlinkcategories");
    };

    $scope.openAdministerMandatory = function () {
        $scope.deselectTopicAndDocument();
        $rootScope.changeContentView("administermandatory");
    };
    $scope.$state = $state;
}]);

