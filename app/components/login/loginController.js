"use strict";

angular.module("ehelseEditor").controller("LoginController", [ "$scope", "$rootScope", "$state", "FileUpload", "StorageHandler", "cfpLoadingBar", function( $scope, $rootScope, $state, FileUpload, StorageHandler, cfpLoadingBar) {

    $scope.$state = $state;
    $scope.isLoaded = false;

    $scope.loadingBarStart = function() {
        cfpLoadingBar.start();
    };

    $scope.loadingBarComplete = function () {
        cfpLoadingBar.complete();
    };
    // Read file in file upload input
    $scope.uploadJsonButton = function () {
        FileUpload.onLoad(function () {
            $scope.isLoaded = true;
            $scope.loadingBarStart();
            $scope.fakeIntro = true;
            setTimeout(function() {
                $scope.loadingBarComplete();
                $scope.fakeIntro = false;
                $rootScope.chosenFilePath = StorageHandler.getChosenFilePath();
            }, 300);
            $scope.$state.go("main-view.editor-view");
        }, function () {
            $scope.isLoaded = false;
            $rootScope.notifyError("Upload failed... :( ", 1000);
        });
    };
    $scope.uploadCsvButton = function () {
        FileUpload.onLoadCSV(function () {
            $scope.isLoaded = true;
            $scope.loadingBarStart();
            $scope.fakeIntro = true;
            setTimeout(function() {
                $scope.loadingBarComplete();
                $scope.fakeIntro = false;
                $rootScope.chosenFilePath = StorageHandler.getChosenFilePath();
            }, 300);
            $scope.$state.go("main-view.editor-view");
        }, function () {
            $scope.isLoaded = false;
            $rootScope.notifyError("Upload failed... :( ", 1000);
        });
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