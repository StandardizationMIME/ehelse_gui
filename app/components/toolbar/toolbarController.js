angular.module("ehelseEditor").controller("ToolbarController",
    ["$state", "$rootScope", "$scope", "CSVConverter", "FileUpload", "StorageHandler", "DownloadList", "Action", "Document", "DocumentField", "DocumentType", "LinkCategory", "Mandatory", "Status", "TargetGroup", "Topic", "DocumentExtractor",
        function ($state, $rootScope, $scope, CSVConverter, FileUpload, StorageHandler, DownloadList, Action, Document, DocumentField, DocumentType, LinkCategory, Mandatory, Status, TargetGroup, Topic, DocumentExtractor) {

            $scope.$parent.registerChildController("ToolbarController", $scope);

            // Remove selected graphics from topics and documents
            $rootScope.deselectTopicAndDocument = function () {
                $rootScope.getDocuments("");
                $rootScope.selected_topic_id = "";
                $rootScope.selected_document = "";
            };

            // Open the different administer views in the content window
            $scope.openAdministerFields = function () {
                $rootScope.checkEditDocumentForm("administerfields",$rootScope.changeContentView)
            };

            $scope.openTargetGroups = function () {
                $rootScope.checkEditDocumentForm("targetgroups",$rootScope.changeContentView)
            };

            $scope.openAdministerActions = function () {
                $rootScope.checkEditDocumentForm("administeractions", $rootScope.changeContentView)
            };

            $scope.openAdministerStatus = function () {
                $rootScope.checkEditDocumentForm("administerstatus", $rootScope.changeContentView)
            };

            $scope.openAdministerLinkCategories = function () {
                $rootScope.checkEditDocumentForm("administerlinkcategories", $rootScope.changeContentView)
            };

            $scope.openAdministerMandatory = function () {
                $rootScope.checkEditDocumentForm("administermandatory", $rootScope.changeContentView)
            };

            $scope.openAdministerHeadings = function () {
                $rootScope.checkEditDocumentForm("administerheadings", $rootScope.changeContentView)
            };

            $scope.openAdministerContactAddresses = function () {
                $rootScope.checkEditDocumentForm("administercontactaddresses", $rootScope.changeContentView)
            };


            // Download save file
            $scope.save = function () {
                FileUpload.onSave(DownloadList.getStorageList());
            };

            $scope.downloadAllDocumentsAsJSON = function(){
                FileUpload.saveToFile(DocumentExtractor.getAllDocumentsAsJSON());
            };

            // Initialize state
            $scope.$state = $state;

            $scope.uploadCsvButton = function () {
                FileUpload.onLoadCSV();
                $rootScope.deselectTopicAndDocument();
                $rootScope.changeContentView("");
            };

            $scope.uploadJsonButton = function () {
                FileUpload.onLoad();
                $rootScope.deselectTopicAndDocument();
                $rootScope.changeContentView("");
            };

            $scope.searchFilter = function (row) {
                return (angular.lowercase(row.title).indexOf(angular.lowercase($rootScope.searchQuery) || '') !== -1 ||
                angular.lowercase(row.hisNumber).indexOf(angular.lowercase($rootScope.searchQuery) || '') !== -1);
            };


            $('#search-filter').keyup(function () {
                if ($(this).val().length == 0) {
                    // Do stuff when input is empty
                }
            });

            $scope.searchFocused = function () {
                $rootScope.searchIsFocused = true;
                $rootScope.selected_topic_id = "";
                if (!$rootScope.searchQuery){
                    $rootScope.checkEditDocumentForm("", $rootScope.changeContentView);
                }
            };
            $rootScope.searchOption = DocumentType.getById;
            $scope.getSearchOptionButtonTitle = function () {
                if ($scope.searchOption == "1") {
                    return "Standard";
                } else if ($scope.searchOption == "2") {
                    return "Profil";
                } else if ($scope.searchOption == "3") {
                    return "Støtte";
                } else {
                    return "Alle";
                }
            };
            $scope.setDocumentTypeSearchFilter = function (type) {
                if (type == 0) {
                    $rootScope.searchOption = "";
                } else {
                    $rootScope.searchOption = type;
                }
            };
        }]);