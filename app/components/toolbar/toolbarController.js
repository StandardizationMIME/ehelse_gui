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

            // Open import_csv modal
            $scope.openCSVImportModal = function () {
                $rootScope.deselectTopicAndDocument();
                $rootScope.openModal("app/components/csvImport/csvImportModal.html", "CSVImportController");
            };

            // Open uploadFile modal
            $scope.openUploadFileModal = function () {
                $rootScope.openModal("app/components/uploadFile/uploadFileModal.html", "UploadFileController");
            };

            // Download save file
            $scope.save = function () {
                FileUpload.saveToFile(DownloadList.getStorageList());
            };

            $scope.downloadAllDocumentsAsJSON = function(){
                FileUpload.saveToFile(DocumentExtractor.getAllDocumentsAsJSON());
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