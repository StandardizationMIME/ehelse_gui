angular.module("ehelseEditor").controller("ToolbarController",
    ["$state", "$rootScope", "$scope", "CSVConverter","FileUpload", "StorageHandler", "DownloadList","Action", "Document", "DocumentField", "DocumentType", "LinkCategory", "Mandatory", "Status", "TargetGroup", "Topic",
    function ($state, $rootScope, $scope,CSVConverter ,FileUpload, StorageHandler, DownloadList, Action, Document, DocumentField, DocumentType, LinkCategory, Mandatory, Status, TargetGroup, Topic) {

    $scope.$parent.registerChildController("ToolbarController", $scope);

    // Remove selected graphics from topics and documents
    $scope.deselectTopicAndDocument = function(){
        $rootScope.getDocuments("");
        $rootScope.selected_topic_id = "";
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
        $rootScope.openModal("app/components/uploadFile/uploadFileModal.html", "UploadFileController");
    };

    // Download save file
    $scope.save = function () {
        FileUpload.saveToFile(DownloadList.getStorageList());
    };

    // Initialize state
    $scope.$state = $state;
        $scope.showCSVContent = function ($fileContentCsv) {
            CSVConverter.uploadCSVContent($fileContentCsv);
            StorageHandler.initCsv();
            Action.init();
            Document.init();
            DocumentField.init();
            DocumentType.init();
            LinkCategory.init();
            Mandatory.init();
            Status.init();
            TargetGroup.init();
            Topic.init();
        };

    $scope.csvLinkClick = function () {
        $("#upload").trigger('click');
    }
}]);

