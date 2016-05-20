"use strict";

angular.module("ehelseEditor").controller("EditorController", [ "$scope", "$rootScope", function($scope, $rootScope) {


    $scope.$parent.registerChildController("EditorController", $scope);

    // Change which html file that is displayed in the content window
    $scope.changeView = function(view) {
        $rootScope.view = view;
    };

    // Make the content window display nothing
    $scope.cancelContentBrowser = function(){
        $rootScope.view = "";

        <!-- Makes selected folder bold and toggles folder icon between opened and closed -->
        $(".document-clickable").removeClass("selected");
        $("#standard" + id).addClass("selected");
    };

}]);