angular.module("ehelseEditor").controller("ToolbarController",
    ["$state", "$rootScope", "$scope", "CSVConverter","FileUpload", "StorageHandler", "DownloadList","Action", "Document", "DocumentField", "DocumentType", "LinkCategory", "Mandatory", "Status", "TargetGroup", "Topic",
    function ($state, $rootScope, $scope,CSVConverter ,FileUpload, StorageHandler, DownloadList, Action, Document, DocumentField, DocumentType, LinkCategory, Mandatory, Status, TargetGroup, Topic) {

    $scope.$parent.registerChildController("ToolbarController", $scope);

    // Remove selected graphics from topics and documents
    $rootScope.deselectTopicAndDocument = function(){
        $rootScope.getDocuments("");
        $rootScope.selected_topic_id = "";
        $rootScope.selected_document = "";
    };

    // Open the different administer views in the content window
    $scope.openAdministerFields = function () {
        $rootScope.deselectTopicAndDocument();
        $rootScope.changeContentView("administerfields");
    };

    $scope.openTargetGroups = function () {
        $rootScope.deselectTopicAndDocument();
        $rootScope.changeContentView("targetgroups");
    };

    $scope.openAdministerActions = function () {
        $rootScope.deselectTopicAndDocument();
        $rootScope.changeContentView("administeractions");
    };

    $scope.openAdministerStatus = function () {
        $rootScope.deselectTopicAndDocument();
        $rootScope.changeContentView("administerstatus");
    };

    $scope.openAdministerLinkCategories = function () {
        $rootScope.deselectTopicAndDocument();
        $rootScope.changeContentView("administerlinkcategories");
    };

    $scope.openAdministerMandatory = function () {
        $rootScope.deselectTopicAndDocument();
        $rootScope.changeContentView("administermandatory");
    };

    // Open import_csv modal
    $scope.openCSVImportModal = function (){
        $rootScope.deselectTopicAndDocument();
        $rootScope.openModal("app/components/csvImport/csvImportModal.html","CSVImportController");
    };

    // Open uploadFile modal
    $scope.openUploadFileModal = function () {
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

