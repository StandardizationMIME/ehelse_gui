"use strict";

angular.module("ehelseEditor").controller("LoginController", [ "$scope", "$rootScope", "$state", "FileUpload", "StorageHandler", "cfpLoadingBar", function( $scope, $rootScope, $state, FileUpload, StorageHandler, cfpLoadingBar) {

    $scope.$state = $state;
    $rootScope.savingFilePath = "";
    $rootScope.currentFilePath = "";

    // Read file in file upload input
    $scope.uploadJsonButton = function () {
        FileUpload.onLoadJSON(function () {
            setTimeout(function() {

                $rootScope.savingFilePath = StorageHandler.getSavingFilePath();
                $rootScope.currentFilePath = StorageHandler.getCurrentFilePath();

                $scope.goToSite();
            }, 500);
        }, function () {
            $rootScope.notifyError("Upload failed... :( ", 1000);
        });
    };
    $scope.uploadCsvButton = function () {
        FileUpload.onLoadCSV(function () {
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