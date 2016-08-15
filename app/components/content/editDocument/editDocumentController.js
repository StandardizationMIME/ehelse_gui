"use strict";

angular.module("ehelseEditor").controller("EditDocumentController",
    [ "$scope", "$http","$rootScope", "ModalService", "DocumentType", "TargetGroup", "Mandatory", "Action","Document", "DocumentField","LinkCategory", "Topic","Status", "DocumentExtractor", "FileUpload", "ContactAddress", "Heading", "cfpLoadingBar", "StorageHandler",
        function( $scope, $http, $rootScope, ModalService, DocumentType, TargetGroup, Mandatory, Action, Document, DocumentField, LinkCategory, Topic, Status, DocumentExtractor, FileUpload, ContactAddress, Heading, cfpLoadingBar, StorageHandler) {

            // Save document values to scope so they can be easily accessed in the html files
            $scope.document_types_option_list = DocumentType.getDocumentTypesOptionList();
            $scope.target_groups_dict = TargetGroup.getAllAsDict();
            $scope.mandatory_list = Mandatory.getAll();
            $scope.actions_option_list = Action.getAllAsOptionsList();
            $scope.fields_dict = DocumentField.getDocumentFieldsDict();
            $scope.document = Document.getCurrentDocument();
            $scope.setCurrentDocumentFieldsByDocumentDocumentTypeId = Document.setCurrentDocumentFieldsByDocumentDocumentTypeId;
            $scope.topicTupleList = Topic.getAllAsOptionsList();
            $scope.removeTargetGroup = Document.removeCurrentDocumentTargetGroup;
            $scope.removeField = Document.removeCurrentDocumentField;
            $scope.removeLink = Document.removeCurrentDocumentLink;
            $scope.removeLinkCategory = Document.removeCurrentDocumentLinksByCategoryId;
            $scope.removeHeading = Document.removeCurrentDocumentHeading;
            $scope.document_dict = Document.getAllAsDict();
            $scope.status_list = Status.getAll();
            $scope.contact_address_list = ContactAddress.getAll();
            $scope.linkCategories = Document.getCurrentDocumentLinksAsLinkCategoryList();
            $scope.headings_dict = Heading.getAllAsDict();
            $scope.linkCategoriesDict = LinkCategory.getAllAsDict();

            $scope.$parent.$parent.registerChildController("EditDocumentController", $scope);
            $scope.$on('$destroy', function () {
                $scope.$parent.$parent.removeChildController("EditDocumentController");
                console.log("EditorDocumentController scope destroyed and removed from childControllers");
            });


            $scope.hasMandatoryTargetGroup = function () {
                $rootScope.updateMandatoryNotices();
                for (var documentTargetGroupIndex = 0; documentTargetGroupIndex < $scope.document.targetGroups.length; documentTargetGroupIndex++) {
                    if ($scope.document.targetGroups[documentTargetGroupIndex].mandatoryId == 1) {
                        return true;
                    }
                }
                return false;
            };

            $scope.toggleProfilesBar = function(){
                if($rootScope.documentState == "editDocument"){
                    $rootScope.documentState = "hideProfilesFromStandard";
                }else if($rootScope.documentState == 'editProfile'){
                    $rootScope.documentState = "hideProfilesFromProfile";
                }else if($rootScope.documentState == "hideProfilesFromStandard"){
                    $rootScope.documentState = "editDocument";
                }else if($rootScope.documentState == "hideProfilesFromProfile"){
                    $rootScope.documentState = "editProfile";
                }else if($rootScope.documentState == "newProfile"){
                    $rootScope.documentState = 'hideProfilesFromNewProfile';
                }else if($rootScope.documentState == "hideProfilesFromNewProfile"){
                    $rootScope.documentState = 'newProfile';
                }
            };

            $scope.disableTargetGroupDecidedBy = function () {
                $rootScope.additionalFieldForMandatoryGroupsSelected = false;
                $scope.document.decidedBy = null;
            };
            $scope.disableTargetGroupLegalBases = function () {
                $rootScope.additionalFieldForMandatoryGroupsSelected = true;
                $scope.document.targetGroupLegalBases = null;
            };

            $scope.getMandatoryNameById = function (mandatoryId) {
                for (var i = 0; i < $scope.mandatory_list.length; i++) {
                    if ($scope.mandatory_list[i].id == mandatoryId) {
                        return $scope.mandatory_list[i].name.toLowerCase();
                    }
                }
            };

            function removeDuplicates(arr) {
                var tmp = [];
                for (var i = 0; i < arr.length; i++) {
                    if (tmp.indexOf(arr[i]) == -1) {
                        tmp.push(arr[i]);
                    }
                }
                return tmp;
            }

            function arrayObjectIndexOf(myArray, searchTerm, property) {
                for (var i = 0, len = myArray.length; i < len; i++) {
                    if (myArray[i][property] === searchTerm) return i;
                }
                return -1;
            }

            $rootScope.updateMandatoryNotices = function () {
                var documentTargetGroupsMandatoryIdList = [];
                var documentMandatoryNoticesIdList = [];

                for (var i = 0; i < $scope.document.targetGroups.length; i++) {
                    documentTargetGroupsMandatoryIdList.push($scope.document.targetGroups[i].mandatoryId);
                }

                if (!$scope.document.mandatoryNotices) {
                    $scope.document.mandatoryNotices = [];
                }
                for (var j = 0; j < $scope.document.mandatoryNotices.length; j++) {
                    documentMandatoryNoticesIdList.push($scope.document.mandatoryNotices[j].mandatoryId);
                }

                var uniqueDocumentTargetGroupsMandatoryIdList = removeDuplicates(documentTargetGroupsMandatoryIdList);
                var uniqueDocumentMandatoryNoticesIdList = removeDuplicates(documentMandatoryNoticesIdList);

                for (var q = 0; q < uniqueDocumentTargetGroupsMandatoryIdList.length; q++) {
                    if (!(uniqueDocumentMandatoryNoticesIdList.indexOf(uniqueDocumentTargetGroupsMandatoryIdList[q]) > -1)) {
                        $scope.document.mandatoryNotices.push({
                            "mandatoryId": uniqueDocumentTargetGroupsMandatoryIdList[q],
                            "notice": ""
                        });
                    }
                }

                var updatedDocumentMandatoryNoticesIdList = [];
                for (var j = 0; j < $scope.document.mandatoryNotices.length; j++) {
                    updatedDocumentMandatoryNoticesIdList.push($scope.document.mandatoryNotices[j].mandatoryId);
                }
                var uniqueUpdatedMandatoryNoticesIdList = removeDuplicates(updatedDocumentMandatoryNoticesIdList);

                for (var p = 0; p < uniqueUpdatedMandatoryNoticesIdList.length; p++) {
                    if (!(uniqueDocumentTargetGroupsMandatoryIdList.indexOf(uniqueUpdatedMandatoryNoticesIdList[p]) > -1)) {
                        var tempIndex = arrayObjectIndexOf($scope.document.mandatoryNotices, uniqueUpdatedMandatoryNoticesIdList[p], "mandatoryId");
                        $scope.document.mandatoryNotices.splice(tempIndex, 1);
                    }
                }
            };

            // Submit function used both create new documents and save changes to existing ones
            $scope.submit = function (form) {
                $rootScope.clearSearchFilterText();
                if(!$scope.hasMandatoryTargetGroup()){
                    $scope.document.targetGroupLegalBases = null;
                    $scope.document.decidedBy = null;
                }
                Document.submitCurrentDocument();
                form.$setPristine();
            };

            $scope.getTextRows = function (string) {
                if (string.split(/\r\n|\r|\n/).length < 6) {
                    return Math.floor(string.length / 60) + string.split(/\r\n|\r|\n/).length
                } else {
                    return Math.floor(string.length / 80) + string.split(/\r\n|\r|\n/).length
                }
            };

            $scope.getFormattedTimestamp = function (timestamp) {
                if (timestamp) {
                    return {
                        date: timestamp.substring(8, 10) + "." + timestamp.substring(5, 7) + "." + timestamp.substring(0, 4),
                        time: timestamp.substring(11, 16)
                    };
                }
            };

            // Delete selected document
            $scope.deleteDocument = function () {
                Document.deleteCurrentDocument();
            };

            // Initialize document with its current links.
            $scope.addLinkToDocument = Document.addLinkToCurrentDocumentByLinkCategoryId;

            // Open modal for adding target groups to the document
            $scope.showAddTargetGroupModal = function () {
                ModalService.showModal({
                    templateUrl: "app/components/content/editDocument/target-groups/addDocumentTargetGroupModal.html",
                    controller: "AddDocumentTargetGroupModelController",
                    animation: false
                }).then(function (modal) {
                    modal.element.modal();
                    modal.close.then(function (result) {
                        console.log(result);
                    });
                });
            };

            // Create a new profile with a relation to selected document
            $rootScope.newProfile = function (standardId) {
                Document.setCurrentDocument(Document.getNewProfile(standardId));
            };

            // Create a new version (clone) of selected document
            $scope.newVersion = function (document) {
                $rootScope.selected_document = "";
                Document.setCurrentDocument(Document.newVersion(document));
                $rootScope.notifySuccess("Ny versjon klargjort", 3000);
                $rootScope.setDocumentState('newDocument');
                if ($rootScope.childControllers["EditDocumentController"]) {
                    $rootScope.childControllers["EditorController"].resetForm();
                }
            };

            $rootScope.resetForm = function () {
                $scope.$watch('EditDocumentController.DocumentForm', function (theForm) {
                    if (theForm) {
                        $scope.EditDocumentController.DocumentForm.$setPristine();
                    }
                });
            };

            $('.my-tooltip').mouseenter(function () {
                var that = $(this);
                that.tooltip('show');
                setTimeout(function () {
                    that.tooltip('hide');
                }, 1000);
            });
        }
    ]);

angular.module("ehelseEditor").filter('unique', function () {
    return function (collection, keyname) {
        var output = [],
            keys = [];

        angular.forEach(collection, function (item) {
            var key = item[keyname];
            if (keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });

        return output;
    };
});