angular.module("ehelseEditor").controller("ToolbarController",
    ["$state", "$rootScope", "$scope", "CSVConverter", "FileUpload", "StorageHandler", "DownloadList", "Action", "Document", "DocumentField", "DocumentType", "LinkCategory", "Mandatory", "Status", "TargetGroup", "Topic",
        function ($state, $rootScope, $scope, CSVConverter, FileUpload, StorageHandler, DownloadList, Action, Document, DocumentField, DocumentType, LinkCategory, Mandatory, Status, TargetGroup, Topic) {

            $scope.$parent.registerChildController("ToolbarController", $scope);

            // Remove selected graphics from topics and documents
            $rootScope.deselectTopicAndDocument = function () {
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


            // Download save file
            $scope.save = function () {
                FileUpload.onSave(DownloadList.getStorageList());
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
                    $rootScope.changeContentView("");
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