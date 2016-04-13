'use strict';

angular.module('ehelseEditor').factory('DocumentField', ['$rootScope', function($rootScope) {

    var document_fields = [];
    var document_types_fields_dict = {};
    var document_fields_dict = {};

    function getDocumentTypes(){
        $rootScope.get(
            'document-fields',
            function ( data ){
                Array.prototype.push.apply(document_fields, data.documentFields);
                console.log(data.documentFields);
                generateDocumentFieldDict(document_fields);
                generateDocumentFieldTypeDict(document_fields);
            },
            function (data) {
                console.log("No document types found");
            }
        )
    }
    function generateDocumentFieldTypeDict(document_fields){
        for(var i = 0; i < document_fields.length; i++){
            var document_field = document_fields[i];
            if(!document_types_fields_dict[document_field.documentTypeId]){
                document_types_fields_dict[document_field.documentTypeId] = {};
            }
            document_types_fields_dict[document_field.documentTypeId][document_field.id] = document_field;
        }
    }

    function generateDocumentFieldDict(document_fields){
        for(var i = 0; i < document_fields.length; i++){
            document_fields_dict[document_fields[i].id] = document_fields[i];
        }
        console.log(document_fields_dict);
    }



    getDocumentTypes();

    function generateDocumentTypesOptionList(document_types){
        var tuples = [];

        for (var i = 0; i < document_types.length; i++) {
            var document_type = document_types[i];
            tuples.push({
                value: document_type.id,
                name: document_type.name
            })
        }
        return tuples;
    }

    function getFieldsByDocumentTypeId(documentTypeId){
        if(!document_types_fields_dict[documentTypeId]){
            return [];
        }
        return document_types_fields_dict[documentTypeId];
    }

    return {
        document_fields : document_fields,
        getFieldsByDocumentTypeId: getFieldsByDocumentTypeId,
        document_fields_dict: document_fields_dict
    };
}]);
