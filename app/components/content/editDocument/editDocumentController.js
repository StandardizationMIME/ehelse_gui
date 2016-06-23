
"use strict";

angular.module("ehelseEditor").controller("EditDocumentController",
    [ "$scope", "$http","$rootScope", "ModalService", "DocumentType", "TargetGroup", "Mandatory", "Action","Document", "DocumentField","LinkCategory", "Topic","Status",
        function( $scope, $http, $rootScope, ModalService, DocumentType, TargetGroup, Mandatory, Action, Document, DocumentField, LinkCategory, Topic, Status) {

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

            // Submit function used both create new documents and save changes to existing ones
            $scope.submit = function(form){
                Document.submitCurrentDocument();
                form.$setPristine();
            };


            $scope.getTextRows = function(string){
                if(string.split(/\r\n|\r|\n/).length < 6){
                    return Math.floor(string.length/70) + string.split(/\r\n|\r|\n/).length
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

            /*
            // XML GENERATOR
            function generateXMLString(name, content){
                var resultXML;
                if (!content){
                    resultXML = '<' + name + '/>' + '\n';
                }else{
                    resultXML = '<' + name + '>' + content + '</' + name + '>' + '\n';
                }
                return resultXML;
            }

            var xmlNavn,
                xmlVersjon,
                xmlIdentifikator,
                xmlErstatter,
                xmlErsattetAv;

            xmlNavn = generateXMLString('Navn',Topic.getById($scope.document.topicId).title);
            xmlVersjon = generateXMLString('Versjon', ''); // TO DO: where version can be found
            xmlIdentifikator = generateXMLString('Identifikator', $scope.document.hisNumber);
            if ($scope.document.previousDocumentId){
                xmlErstatter = generateXMLString('Erstatter', Document.getById($scope.document.previousDocumentId).hisNumber);
                console.log(xmlErstatter);
            }
            if ($scope.document.nextDocumentId){
                xmlErsattetAv = generateXMLString('ErstattetAv', Document.getById($scope.document.nextDocumentId).hisNumber);
                console.log(xmlErsattetAv);
            }


            console.log(xmlNavn + xmlIdentifikator);
            */

            // OLD comment
            /*function convertDocumentFieldsToXML(){
                var document_to_convert = $scope.document;
                console.log("document to convert: ")
                console.log(document_to_convert);

                var fields_to_convert = document_to_convert.fields;
                console.log("fields to convert");
                console.log(fields_to_convert);

                for(var i = 0; i < fields_to_convert.length; i++){
                    var current_field_to_convert = fields_to_convert[i];
                    console.log("element " + i + " in fields to convert");
                    console.log(current_field_to_convert);

                    for (var key in current_field_to_convert){
                        console.log(current_field_to_convert[key]);
                    }

                }
            }



            convertDocumentFieldsToXML();*/
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