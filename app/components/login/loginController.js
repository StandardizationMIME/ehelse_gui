"use strict";

angular.module("ehelseEditor").controller("LoginController", [ "$scope", "$rootScope", "$state", "FileUpload", function( $scope, $rootScope, $state, FileUpload) {

    $scope.$state = $state;
    $scope.isLoaded = false;

    // Read file in file upload input
    $scope.uploadJsonButton = function () {
        FileUpload.onLoad();
        $scope.isLoaded = true;
    };
    $scope.uploadCsvButton = function () {
        FileUpload.onLoadCSV();
        $scope.isLoaded = true;
    };

    // Open editor view
    $scope.goToSite = function(){
        $scope.$state.go("main-view.editor-view");
    };

    // Check if file is uploaded
    $scope.invalid = function () {
        return !$scope.isLoaded;
    };

}]);