angular.module("ehelseEditor").controller("ToolbarController",
    ["$state", "$rootScope", "$scope", "CSVConverter", "FileUpload", "StorageHandler", "DownloadList", "Action", "Document", "DocumentField", "DocumentType", "LinkCategory", "Mandatory", "Status", "TargetGroup", "Topic", "DocumentExtractor", "cfpLoadingBar",
        function ($state, $rootScope, $scope, CSVConverter, FileUpload, StorageHandler, DownloadList, Action, Document, DocumentField, DocumentType, LinkCategory, Mandatory, Status, TargetGroup, Topic, DocumentExtractor, cfpLoadingBar) {

            $rootScope.chosenFilePath = "";
            $scope.$parent.registerChildController("ToolbarController", $scope);

            // Remove selected graphics from topics and documents
            $rootScope.deselectTopicAndDocument = function () {
                $rootScope.getDocuments("");
                $rootScope.selected_topic_id = "";
                $rootScope.selected_document = "";
                $rootScope.topic.title = "Referansekatalogen";
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
                FileUpload.onSave(DownloadList.getStorageList(), function () {
                    $rootScope.notifySuccess("Save succeed! To: " + $rootScope.chosenFilePath , 2000);
                }, function () {
                    $rootScope.notifyError("Save failed... :(", 1000);
                });
            };

            $scope.downloadAllDocumentsAsJSON = function(){
                FileUpload.onSaveAs(DocumentExtractor.getAllDocumentsAsJSON(), function () {
                    $rootScope.notifySuccess("Save succeed! To: " + $rootScope.chosenFilePath , 2000);
                }, function () {
                    $rootScope.notifyError("Save failed... :(", 1000);
                });
            };

            // Initialize state
            $scope.$state = $state;

            $scope.uploadCsvButton = function () {
                FileUpload.onLoadCSV(function () {
                    $rootScope.deselectTopicAndDocument();
                    $rootScope.changeContentView("");
                    $rootScope.notifySuccess("Upload succeed! :) ", 1000);
                    // fake the initial load
                    $scope.loadingBarStart();
                    $scope.fakeIntro = true;
                    setTimeout(function() {
                        $scope.loadingBarComplete();
                        $scope.fakeIntro = false;
                        $rootScope.chosenFilePath = StorageHandler.getChosenFilePath();
                    }, 500);
                }, function () {
                    $rootScope.notifyError("Upload failed... :( ", 1000);
                });
            };

            $scope.loadingBarStart = function() {
                cfpLoadingBar.start();
            };

            $scope.loadingBarComplete = function () {
                cfpLoadingBar.complete();
            };

            $scope.uploadJsonButton = function () {
                FileUpload.onLoad(function () {
                    $rootScope.deselectTopicAndDocument();
                    $rootScope.changeContentView("");
                    $rootScope.notifySuccess("Upload succeed! :) ", 1000);
                    // fake the initial load
                    $scope.loadingBarStart();
                    $scope.fakeIntro = true;
                    setTimeout(function() {
                        $scope.loadingBarComplete();
                        $scope.fakeIntro = false;
                        $rootScope.chosenFilePath = StorageHandler.getChosenFilePath();
                    }, 500);
                }, function () {
                    $rootScope.notifyError("Upload failed... :( ", 1000);
                });
                console.log(StorageHandler.getChosenFilePath());
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