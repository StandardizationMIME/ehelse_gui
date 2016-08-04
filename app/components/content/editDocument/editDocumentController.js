
"use strict";

angular.module("ehelseEditor").controller("EditDocumentController",
    [ "$scope", "$http","$rootScope", "ModalService", "DocumentType", "TargetGroup", "Mandatory", "Action","Document", "DocumentField","LinkCategory", "Topic","Status", "DocumentExtractor", "FileUpload",
        function( $scope, $http, $rootScope, ModalService, DocumentType, TargetGroup, Mandatory, Action, Document, DocumentField, LinkCategory, Topic, Status, DocumentExtractor, FileUpload) {

           // Save document values to scope so they can be easily accessed in the html files
            $scope.document_types_option_list = DocumentType.getDocumentTypesOptionList();
            $scope.target_groups_dict = TargetGroup.getAllAsDict();
            $scope.mandatory_list = Mandatory.getAll();
            $scope.actions_option_list = Action.getAllAsOptionsList();
            $scope.fields_dict = DocumentField.getDocumentFieldsDict();
            $scope.document = Document.getCurrentDocument();
            $scope.setCurrentDocumentFieldsByDocumentDocumentTypeId = Document.setCurrentDocumentFieldsByDocumentDocumentTypeId;
            $scope.linkCategories = Document.getCurrentDocumentLinksAsLinkCategoryList();
            $scope.topicTupleList = Topic.getAllAsOptionsList();
            $scope.removeTargetGroup = Document.removeCurrentDocumentTargetGroup;
            $scope.removeField = Document.removeCurrentDocumentField;
            $scope.removeLink = Document.removeCurrentDocumentLink;
            $scope.linkCategoriesDict = LinkCategory.getAllAsDict();
            $scope.removeLinkCategory = Document.removeCurrentDocumentLinksByCategoryId;
            $scope.document_dict = Document.getAllAsDict();
            $scope.status_list = Status.getAll();

            $scope.hasMandatoryTargetGroup = function () {
                for (var documentTargetGroupIndex = 0; documentTargetGroupIndex < $scope.document.targetGroups.length; documentTargetGroupIndex++){
                    if ($scope.document.targetGroups[documentTargetGroupIndex].mandatoryId == 1){
                        return true;
                    }
                }
                return false;
            };

            $scope.disableTargetGroupDecidedBy = function () {
                $rootScope.additionalFieldForMandatoryGroupsSelected = false;
                $scope.document.decidedBy = null;
            };
            $scope.disableTargetGroupHjemmel = function () {
                $rootScope.additionalFieldForMandatoryGroupsSelected = true;
                $scope.document.hjemmel = null;
            };

            $scope.getMandatoryNameById = function (mandatoryId) {
                for (var i = 0; i < $scope.mandatory_list.length; i++){
                    if ($scope.mandatory_list[i].id == mandatoryId){
                        return $scope.mandatory_list[i].name.toLowerCase();
                    }
                }
            };

            function removeDuplicates(arr) {
                var tmp = [];
                for(var i = 0; i < arr.length; i++){
                    if(tmp.indexOf(arr[i]) == -1){
                        tmp.push(arr[i]);
                    }
                }
                return tmp;
            }

            $rootScope.updateMandatoryNotices = function () {
                var documentTargetGroupsMandatoryIdList = [];
                var documentMandatoryNoticesIdList = [];

                for(var i = 0; i < $scope.document.targetGroups.length; i++){
                    documentTargetGroupsMandatoryIdList.push($scope.document.targetGroups[i].mandatoryId);
                }

                for(var j = 0; j < $scope.document.mandatoryNotices.length; j++){
                    documentMandatoryNoticesIdList.push($scope.document.mandatoryNotices[j].mandatoryId);
                }

                console.log(removeDuplicates(documentTargetGroupsMandatoryIdList));
                console.log(removeDuplicates(documentMandatoryNoticesIdList));
                for (var q = 0; q < removeDuplicates(documentTargetGroupsMandatoryIdList).length; q++){
                    if (removeDuplicates(documentTargetGroupsMandatoryIdList).indexOf(removeDuplicates(documentMandatoryNoticesIdList)[q]) < 0){
                        console.log(removeDuplicates(documentTargetGroupsMandatoryIdList)[q]);
                        $scope.document.mandatoryNotices.push({"mandatoryId": removeDuplicates(documentTargetGroupsMandatoryIdList)[q],
                                                               "notice": ""});
                    }
                }


                /*for (var i = 0; i < $scope.document.targetGroups.length; i++){
                    console.log($scope.document.targetGroups[i].mandatoryId);
                    console.log($scope.document.mandatoryNotices);
                    console.log(!$scope.document.targetGroups[i].mandatoryId in $scope.document.mandatoryNotices);
                    for (var j = 0; j < $scope.document.mandatoryNotices.length; j++){
                        if($scope.document.targetGroups[i].mandatoryId != $scope.document.mandatoryNotices[j].mandatoryId){
                            var tempMandatoryNotice = {
                                "mandatoryId": $scope.document.targetGroups[i].mandatoryId,
                                "notice": ""
                            };
                            $scope.document.mandatoryNotices.push(tempMandatoryNotice);
                            console.log(tempMandatoryNotice + " pushed");
                        }
                    }
                    if(!$scope.document.targetGroups[i].mandatoryId in $scope.document.mandatoryNotices){
                        var tempMandatoryNotice = {
                            "mandatoryId": $scope.targetGroups[i].mandatoryId,
                            "notice": ""
                        };
                        $scope.document.mandatoryNotices.push(tempMandatoryNotice);
                        console.log(tempMandatoryNotice + " pushed");
                    }
                }*/
            };

            // Submit function used both create new documents and save changes to existing ones
            $scope.submit = function(form){
                $rootScope.clearSearchFilterText();
                if(!$scope.hasMandatoryTargetGroup()){
                    $scope.document.hjemmel = null;
                    $scope.document.decidedBy = null;
                }
                Document.submitCurrentDocument();
                form.$setPristine();
            };

            $scope.downloadDocumentAsJSON = function(doc){
                FileUpload.saveToFile(DocumentExtractor.getDocumentAsJSON(doc));
            };


            $scope.getTextRows = function(string){
                if(string.split(/\r\n|\r|\n/).length < 6){
                    return Math.floor(string.length/80) + string.split(/\r\n|\r|\n/).length
                }else{
                    return Math.floor(string.length/100) + string.split(/\r\n|\r|\n/).length
                }
            };

            $scope.getFormattedTimestamp = function(timestamp){
                if(timestamp){
                    return {date: timestamp.substring(8,10) + "." + timestamp.substring(5,7) + "." + timestamp.substring(0,4), time: timestamp.substring(11,16)};
                }
            };
            
            // Delete selected document
            $scope.deleteDocument = function(){
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
            $scope.newProfile = function(standardId){
                Document.setCurrentDocument(Document.getNewProfile(standardId));
            };

            // Create a new version (clone) of selected document
            $scope.newVersion = function(document){
                $rootScope.selected_document = "";
                Document.setCurrentDocument(Document.newVersion(document));
                $rootScope.notifySuccess("Ny versjon klargjort", 3000);
                $rootScope.setDocumentState('newDocument');
            };

         $rootScope.resetForm = function () {
             $scope.$watch('EditDocumentController.DocumentForm', function(theForm) {
                 if(theForm) {
                     $scope.EditDocumentController.DocumentForm.$setPristine();
                 }
             });
         };
        }
    ]);

angular.module("ehelseEditor").filter('unique', function() {
    return function(collection, keyname) {
        var output = [],
            keys = [];

        angular.forEach(collection, function(item) {
            var key = item[keyname];
            if(keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });

        return output;
    };
});