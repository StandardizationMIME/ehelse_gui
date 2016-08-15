angular.module("ehelseEditor").controller("ToolbarController",
    ["$state", "$rootScope", "$scope", "CSVConverter", "FileUpload", "StorageHandler", "DownloadList", "Action", "Document", "DocumentField", "DocumentType", "LinkCategory", "Mandatory", "Status", "TargetGroup", "Topic", "DocumentExtractor", "cfpLoadingBar",
        function ($state, $rootScope, $scope, CSVConverter, FileUpload, StorageHandler, DownloadList, Action, Document, DocumentField, DocumentType, LinkCategory, Mandatory, Status, TargetGroup, Topic, DocumentExtractor, cfpLoadingBar) {

            $scope.$parent.registerChildController("ToolbarController", $scope);

            // Remove selected graphics from topics and documents
            $rootScope.deselectTopicAndDocument = function () {
                $rootScope.getDocuments("");
                $rootScope.searchIsFocused = true;
                $rootScope.selected_topic_id = "";
                $rootScope.selected_document = "";
                $rootScope.topic.title = "Referansekatalogen";
                $rootScope.changeContentView("");
            };

            $rootScope.text = {
                size: 14
            };

            // Open the different administer views in the content window
            $scope.openAdministerFields = function () {
                if ($rootScope.formNotPristine('document')) {
                    $rootScope.checkEditTopicForm("administerfields", $rootScope.changeContentView);
                } else {
                    $rootScope.checkEditDocumentForm("administerfields",$rootScope.changeContentView);
                }
            };

            $scope.openTargetGroups = function () {
                if ($rootScope.formNotPristine('document')) {
                    $rootScope.checkEditTopicForm("targetgroups",$rootScope.changeContentView);
                } else {
                    $rootScope.checkEditDocumentForm("targetgroups",$rootScope.changeContentView);
                }
            };

            $scope.openAdministerActions = function () {
                if ($rootScope.formNotPristine('document')) {
                    $rootScope.checkEditTopicForm("administeractions", $rootScope.changeContentView);
                } else {
                    $rootScope.checkEditDocumentForm("administeractions", $rootScope.changeContentView);
                }
            };

            $scope.openAdministerStatus = function () {
                if ($rootScope.formNotPristine('document')) {
                    $rootScope.checkEditTopicForm("administerstatus", $rootScope.changeContentView);
                } else {
                    $rootScope.checkEditDocumentForm("administerstatus", $rootScope.changeContentView);
                }
            };

            $scope.openAdministerLinkCategories = function () {
                if ($rootScope.formNotPristine('document')) {
                    $rootScope.checkEditTopicForm("administerlinkcategories", $rootScope.changeContentView);
                } else {
                    $rootScope.checkEditDocumentForm("administerlinkcategories", $rootScope.changeContentView);
                }
            };

            $scope.openAdministerMandatory = function () {
                if ($rootScope.formNotPristine('document')) {
                    $rootScope.checkEditTopicForm("administermandatory", $rootScope.changeContentView);
                } else {
                    $rootScope.checkEditDocumentForm("administermandatory", $rootScope.changeContentView);
                }
            };

            $scope.openAdministerHeadings = function () {
                if ($rootScope.formNotPristine('document')) {
                    $rootScope.checkEditTopicForm("administerheadings", $rootScope.changeContentView);
                } else {
                    $rootScope.checkEditDocumentForm("administerheadings", $rootScope.changeContentView);
                }
            };

            $scope.openAdministerContactAddresses = function () {
                if ($rootScope.formNotPristine('document')) {
                    $rootScope.checkEditTopicForm("administercontactaddresses", $rootScope.changeContentView);
                } else {
                    $rootScope.checkEditDocumentForm("administercontactaddresses", $rootScope.changeContentView);
                }
            };

            $rootScope.loadingBarStart = function() {
                cfpLoadingBar.start();
            };
            $rootScope.loadingBarComplete = function () {
                cfpLoadingBar.complete();
            };

            // Download save file
            $scope.save = function () {
                FileUpload.onSaveMimeJSON(DownloadList.getStorageList(), function () {
                    $rootScope.loadingBarStart();
                    $scope.fakeIntro = true;
                    setTimeout(function() {
                        $rootScope.savingFilePath = StorageHandler.getSavingFilePath();
                        $rootScope.currentFilePath = StorageHandler.getCurrentFilePath();

                        $rootScope.notifySuccess("Save succeed! To: " + $rootScope.savingFilePath, 2000);

                        $rootScope.loadingBarComplete();
                        $scope.fakeIntro = false;
                    }, 500);
                }, function () {
                    $rootScope.notifyError("Save failed... :(", 1000);
                });
            };

            $scope.downloadAllDocumentsAsJSON = function(){
                FileUpload.onSaveWebJSON(DocumentExtractor.getAllDocumentsAsJSON(), function () {
                    $rootScope.loadingBarStart();
                    $scope.fakeIntro = true;
                    setTimeout(function() {
                        $rootScope.savingFilePath= StorageHandler.getSavingFilePath();
                        
                        $rootScope.notifySuccess("Save succeed! To: " + $rootScope.savingFilePath , 3000);
                        
                        $rootScope.loadingBarComplete();
                        $scope.fakeIntro = false;
                    }, 500);
                }, function () {
                    $rootScope.notifyError("Save failed... :(", 1000);
                });
            };

            // Initialize state
            $scope.$state = $state;

            $scope.uploadCsvButton = function () {
                FileUpload.onLoadCSV(function () {
                    // fake the initial load
                    $rootScope.loadingBarStart();
                    $scope.fakeIntro = true;
                    setTimeout(function() {
                        $rootScope.deselectTopicAndDocument();
                        $rootScope.clearSearchFilterText();
                        $rootScope.changeContentView("");
                        
                        $rootScope.currentFilePath = StorageHandler.getSavingFilePath();
                        $rootScope.notifySuccess("Upload succeed! :) ", 1000);

                        $rootScope.loadingBarComplete();
                        $scope.fakeIntro = false;
                    }, 500);
                }, function () {
                    $rootScope.notifyError("Upload failed... :( ", 1000);
                });
            };

            $scope.uploadJsonButton = function () {
                FileUpload.onLoadJSON(function () {
                    // fake the initial load
                    $rootScope.loadingBarStart();
                    $scope.fakeIntro = true;
                    setTimeout(function() {
                        $rootScope.deselectTopicAndDocument();
                        $rootScope.clearSearchFilterText();
                        $rootScope.changeContentView("");

                        $rootScope.savingFilePath = StorageHandler.getSavingFilePath();
                        $rootScope.currentFilePath = StorageHandler.getCurrentFilePath();
                        $rootScope.notifySuccess("Upload succeed! :) ", 1000);

                        $rootScope.loadingBarComplete();
                        $scope.fakeIntro = false;
                    }, 500);
                }, function () {
                    $rootScope.notifyError("Upload failed... :( ", 1000);
                });
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
                if (!$rootScope.searchQuery){
                    if ($rootScope.formNotPristine('document')) {
                        $rootScope.checkEditTopicForm("", $rootScope.deselectTopicAndDocument);
                    } else {
                        $rootScope.checkEditDocumentForm("", $rootScope.deselectTopicAndDocument);
                    }
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