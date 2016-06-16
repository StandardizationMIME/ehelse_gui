"use strict";

angular.module("ehelseEditor").controller("XMLConverController",
    [ "$scope", "$http","$rootScope", "ModalService", "DocumentType", "TargetGroup", "Mandatory", "Action","Document", "DocumentField","LinkCategory", "Topic","Status",
        function( $scope, $http, $rootScope, ModalService, DocumentType, TargetGroup, Mandatory, Action, Document, DocumentField, LinkCategory, Topic, Status) {

            // Save document values to scope so they can be easily accessed in the html files
            $scope.document_types_option_list = DocumentType.document_types_option_list;
            $scope.target_groups_dict = TargetGroup.getAllAsDict();
            $scope.mandatory_list = Mandatory.getAll();
            $scope.actions_option_list = Action.getAllAsOptionsList();
            $scope.fields_dict = DocumentField.document_fields_dict;
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

            function generateXMLString(name, content){
                var resultXML;
                if (!content){
                    resultXML = '<' + name + '/>' + '\n';
                }else{
                    resultXML = '<' + name + '>' + content + '</' + name + '>' + '\n';
                }
                return resultXML;
            }

            function convertDocumentFieldsToXML(){
                var document_to_convert = $scope.document;
                console.log("document to convert: ");
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

            convertDocumentFieldsToXML();

        }
    ]);