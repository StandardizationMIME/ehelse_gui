"use strict";

angular.module("ehelseEditor").controller("LoginController", [ "$scope", "$rootScope", "$state", "FileUpload", function( $scope, $rootScope, $state, FileUpload) {

    $scope.$state = $state;
    $scope.isLoaded = false;

    // Read file in file upload input
    $scope.readFileContent = function ($fileContent) {
        FileUpload.readContent($fileContent);
        $scope.isLoaded = true;
    };

    $scope.goToSite = function(){
        $scope.$state.go("main-view.editor-view");
    }

    // Check if file is uploaded
    $scope.invalid = function () {
        return !$scope.isLoaded;
    };

}]);