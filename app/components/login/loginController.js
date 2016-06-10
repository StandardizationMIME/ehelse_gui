"use strict";

angular.module("ehelseEditor").controller("LoginController", [ "$scope", "$rootScope", "$state", "FileUpload", function( $scope, $rootScope, $state, FileUpload) {

    $scope.$state = $state;

    // Read file in file upload input
    $scope.readFileContent = function ($fileContent) {
        FileUpload.readContent($fileContent);
    };

    $scope.goToSite = function(){
        $scope.$state.go("main-view.editor-view");
    }

}]);