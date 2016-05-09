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

    function create(field, success, error){

        var mandatoryString = null;
        if(field.mandatory){
            mandatoryString = '1';
        }else{
            mandatoryString = '0';
        }

        var myField = {
            "id": "",
            "name": field.name,
            "description": field.description,
            "sequence": field.sequence,
            "mandatory": mandatoryString,
            "documentTypeId": $rootScope.typeId
        };

        $rootScope.post(
            'document-fields/',
            myField,
            function(data){
                document_fields.push(data);
                generateDocumentFieldDict(document_fields);
                generateDocumentFieldTypeDict(document_fields);
                success(data);
            },
            error
        );
    }

    function edit(field, success, error){

        var mandatoryString = null;
        if(field.mandatory){
            mandatoryString = '1';
        }else{
            mandatoryString = '0';
        }

        var myField = {
            "id": field.id,
            "name": field.name,
            "description": field.description,
            "sequence": field.sequence,
            "mandatory": mandatoryString,
            "documentTypeId": $rootScope.typeId
        };
        $rootScope.put(
            'document-fields/' + field.id,
            myField,
            function(data){
                var document_field = document_fields_dict[data.id];
                document_field.name = data.name;
                document_field.description = data.description;
                document_field.mandatory = data.mandatory;
                document_field.sequence = data.sequence;
                success(data)
            },
            error
        );
    }

    function removeField(field){
        var index = document_fields.indexOf(field);
        if (index > -1) {
            document_fields.splice(index, 1);
        }
    }

    function remove(field, success, error){
        $rootScope.delete(
            'document-fields/' + field.id,
            function(){
                removeField(field);
                generateDocumentFieldDict(document_fields);
                generateDocumentFieldTypeDict(document_fields);
                success();
            },
            error
        )
    }

    function clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }

    function getFieldById(id, success, error){
        $rootScope.get(
            'document-fields/' + id,
            function (data) {
                success(data);
            },
            error
        );
    }

    function getRequiredDocumentFieldIdsByDocumentTypeId(documentTypeId){
        var ids = [];
        for( var i = 0; i < document_fields.length; i++){
            if(document_fields[i].documentTypeId == documentTypeId && document_fields[i].mandatory != "0"){
                ids.push(document_fields[i].id);
            }
        }
        return ids;
    }

    return {
        document_fields : document_fields,
        getFieldsByDocumentTypeId: getFieldsByDocumentTypeId,
        document_fields_dict: document_fields_dict,
        create: create,
        edit: edit,
        delete: remove,
        getFieldById: getFieldById,
        getRequiredDocumentFieldIdsByDocumentTypeId: getRequiredDocumentFieldIdsByDocumentTypeId
    };
}]);
