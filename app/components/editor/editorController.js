"use strict";

angular.module("ehelseEditor").controller("EditorController", [ "$scope", "$rootScope", function($scope, $rootScope) {


    $scope.$parent.registerChildController("EditorController", $scope);

    $scope.changeView = function(view) {
        $rootScope.view = view;
    };

    $scope.cancelContentBrowser = function(){
        $rootScope.view = "";
        <!-- Makes selected folder bold and toggles folder icon between opened and closed -->
        $(".document-clickable").removeClass("selected");
        $("#standard" + id).addClass("selected");
    };

}]);