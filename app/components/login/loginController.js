"use strict";

angular.module("ehelseEditor").controller("LoginController", [ "$scope", "$rootScope", "$state", "FileUpload", "StorageHandler", "cfpLoadingBar", function( $scope, $rootScope, $state, FileUpload, StorageHandler, cfpLoadingBar) {

    $scope.$state = $state;
    $rootScope.savingFilePath = "";
    $rootScope.currentFilePath = "";

    $rootScope.loadingBarStart = function() {
        cfpLoadingBar.start();
    };
    $rootScope.loadingBarComplete = function () {
        cfpLoadingBar.complete();
    };
    // Read file in file upload input
    $scope.uploadJsonButton = function () {
        FileUpload.onLoadJSON(function () {
            $rootScope.loadingBarStart();
            $scope.fakeIntro = true;
            setTimeout(function() {
                $rootScope.chosenFilePath = StorageHandler.getChosenFilePath();
                
                $rootScope.loadingBarComplete();
                $scope.fakeIntro = false;
            }, 300);
            $scope.goToSite();
        }, function () {
            $rootScope.notifyError("Upload failed... :( ", 1000);
        });
    };
    $scope.uploadCsvButton = function () {
        FileUpload.onLoadCSV(function () {
            $rootScope.loadingBarStart();
            $scope.fakeIntro = true;
            setTimeout(function() {
                $rootScope.chosenFilePath = StorageHandler.getChosenFilePath();
                
                $rootScope.loadingBarComplete();
                $scope.fakeIntro = false;
            }, 300);
            $scope.goToSite();
        }, function () {
            $rootScope.notifyError("Upload failed... :( ", 1000);
        });
    };

    // Open editor view
    $scope.goToSite = function(){
        $scope.$state.go("main-view.editor-view");
    };

}]);