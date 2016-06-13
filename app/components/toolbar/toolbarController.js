angular.module("ehelseEditor").controller("ToolbarController",
    ["$state", "$rootScope", "$scope", "FileUpload", "StorageHandler", "DownloadList",
    function ($state, $rootScope, $scope, FileUpload, StorageHandler, DownloadList) {

    $scope.$parent.registerChildController("ToolbarController", $scope);

    // Remove selected graphics from topics and documents
    $scope.deselectTopicAndDocument = function(){
        $rootScope.toggleSelectedTopic("");
        $rootScope.getDocuments("");
        $rootScope.selected_document = "";
    };

    // Open the different administer views in the content window
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

    // Open import_csv modal
    $scope.openCSVImportModal = function (){
        $scope.deselectTopicAndDocument();
        $rootScope.openModal("app/components/csvImport/csvImportModal.html","CSVImportController");
    };

    // Open uploadFile modal
    $scope.openUploadFileModal = function () {
        $scope.deselectTopicAndDocument();
        $rootScope.openModal("app/components/uploadFile/uploadFIleModal.html", "UploadFileController");
    }

    $scope.getTest = function () {
        console.log(FileUpload.getJsonFile());
    }
    $scope.splitTest = function () {
        console.log(StorageHandler.getActions());
        console.log(StorageHandler.getDocumentFields());
        console.log(StorageHandler.getDocuments());
        console.log(StorageHandler.getDocumentTypes());
        console.log(StorageHandler.getLinkCategories());
        console.log(StorageHandler.getMandatory());
        console.log(StorageHandler.getStatus());
        console.log(StorageHandler.getTargetGroups());
        console.log(StorageHandler.getTopics());
    }
    $scope.saveTest = function () {
        FileUpload.saveToFile(DownloadList.getStorageList());
    }

    // Initialize state
    $scope.$state = $state;
}]);

