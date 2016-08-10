"use strict";

angular.module("ehelseEditor").factory("DocumentField", ["$rootScope", "StorageHandler", "ServiceFunction", function($rootScope, StorageHandler, ServiceFunction) {

    var document_fields = [];
    var document_types_fields_dict = {};
    var document_fields_dict = {};

    init();

    function init(){
        try{
            Array.prototype.push.apply(document_fields, StorageHandler.getDocumentFields().documentFields);
            for(var i = 0; i < document_fields.length; i++){
                document_fields[i].sequence = Number(document_fields[i].sequence);
            }
            document_fields.sort(ServiceFunction.compareSequence);
            generateDocumentFieldDict(document_fields);
            generateDocumentFieldTypeDict(document_fields);
        }
        catch(error){
            $rootScope.notifyError("Dokumentfelter kunne ikke lastes: " + error, 6000);
            console.log("Document fields could not be loaded" + error);
        }
    }

    /**
     * Function used to clear all lists and dicts used in document fields.
     */
    function clear(){
        document_fields.length = 0;
        document_types_fields_dict = {};
        document_fields_dict = {};

    }

    /**
     * Function used to generate a dict with the document fields split into dicts per document type.
     * @param document_fields
     */
    function generateDocumentFieldTypeDict(document_fields){
        for(var i = 0; i < document_fields.length; i++){
            var document_field = document_fields[i];
            if(!document_types_fields_dict[document_field.documentTypeId]){
                document_types_fields_dict[document_field.documentTypeId] = {};
            }
            document_types_fields_dict[document_field.documentTypeId][document_field.id] = document_field;
        }
    }

    /**
     * Function generating the document field dict.
     *
     * Document field dict is used to get the name of the document field when only the id is available.
     * @param document_fields
     */
    function generateDocumentFieldDict(document_fields){
        for(var i = 0; i < document_fields.length; i++){
            document_fields_dict[document_fields[i].id] = document_fields[i];
        }
    }

    /**
     * Function generating document type options list used to generate option lists in views.
     * @param document_types
     * @returns Array document types option list.
     */
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

    /**
     * Function returning the fields for the provided documentTypeId.
     * @param documentTypeId
     * @returns {*}
     */
    function getFieldsByDocumentTypeId(documentTypeId){
        if(!document_types_fields_dict[documentTypeId]){
            return [];
        }
        return document_types_fields_dict[documentTypeId];
    }

    /**
     * Function creating a new document field.
     *
     * Updates document field dict and options list
     * @param field
     * @param success
     * @param error
     */
    function create(field, success, error){

        try{
            var mandatoryString = null;
            if(field.mandatory){
                mandatoryString = "1";
            }else{
                mandatoryString = "0";
            }
            var isRichText = null;
            if(field.isRichText){
                isRichText = 1;
            }else{
                isRichText = 0;
            }
            var sequenceInt = 1;
            if(field.sequence){
                sequenceInt = field.sequence;
            }

            var myField = {
                "id": ServiceFunction.generateNewId(document_fields),
                "name": field.name,
                "description": field.description,
                "sequence": sequenceInt,
                "mandatory": mandatoryString,
                "documentTypeId": $rootScope.typeId,
                "isArchived": 0,
                "isRichText": isRichText
            };

            document_fields.push(myField);
            document_fields.sort(ServiceFunction.compareSequence);
            generateDocumentFieldDict(document_fields);
            generateDocumentFieldTypeDict(document_fields);
            success(myField);
        }
        catch(err){
            console.log("Field could not be created: " + err);
            error();
        }
    }

    /**
     * Function updating a document field.
     * @param field
     * @param success
     * @param error
     */
    function edit(field, success, error){
        try{
            var mandatoryString = null;
            if(field.mandatory){
                mandatoryString = "1";
            }else{
                mandatoryString = "0";
            }
            var isRichText = null;
            if(field.isRichText){
                isRichText = 1;
            }else{
                isRichText = 0;
            }

            var myField = {
                "id": field.id,
                "name": field.name,
                "description": field.description,
                "sequence": field.sequence,
                "mandatory": mandatoryString,
                "documentTypeId": $rootScope.typeId,
                "isArchived": 0,
                "isRichText": isRichText
            };

            var document_field = document_fields_dict[myField.id];
            document_field.name = myField.name;
            document_field.description = myField.description;
            document_field.mandatory = myField.mandatory;
            document_field.sequence = myField.sequence;
            document_field.isRichText = myField.isRichText;
            success(myField);
            document_fields.sort(ServiceFunction.compareSequence);
        }
        catch(err){
            console.log("Field could not be edited: " + err);
            error();
        }
    }

    /**
     * Function deleting a document field.
     *
     * Updates document field dict and options list.
     * @param field
     * @param success
     * @param error
     */
    function remove(field, success, error){
        try{
            field.isArchived = 1;
            generateDocumentFieldDict(document_fields);
            generateDocumentFieldTypeDict(document_fields);
            success();
        }
        catch(err){
            console.log("Field could not be archived: " + err);
            error();
        }
    }

    /**
     * Function cloning a DocumentField
     * @param obj
     * @returns DocumentField
     */
    function clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }

    /**
     * Function returning a field from its id.
     * @param id
     */
    function getById(id) {
        if(document_fields_dict[id].mandatory == "0"){
            document_fields_dict[id].mandatory = false;
        } else if (document_fields_dict[id].mandatory = "1"){
            document_fields_dict[id].mandatory = true;
        }
        if(document_fields_dict[id].isRichText){
            document_fields_dict[id].isRichText = true;
        } else{
            document_fields_dict[id].isRichText = false;
        }
        return document_fields_dict[id];
    }


    function setDocumentField(to, from){
        to.id = from.id;
        to.name = from.name;
        to.description = from.description;
        to.sequence = from.sequence;
        to.mandatory = from.mandatory;
        to.documentTypeId = from.documentTypeId;
        to.isArchived = from.isArchived;
        to.isRichText = from.isRichText;
    }
    function clone(field){
        var clone = {};
        setDocumentField(clone,field);
        return clone;
    }

    /**
     * Function returning the required fields from the document type id.
     * @param documentTypeId
     * @returns {Array}
     */
    function getRequiredDocumentFieldIdsByDocumentTypeId(documentTypeId){
        var ids = [];
        for( var i = 0; i < document_fields.length; i++){
            if(document_fields[i].documentTypeId == documentTypeId && document_fields[i].mandatory != "0"){
                ids.push(document_fields[i].id);
            }
        }
        return ids;
    }

    function getAll(){
        return document_fields;
    }

    function getDocumentFieldsDict(){
        return document_fields_dict;
    }

    return {
        getDocumentFieldsDict: getDocumentFieldsDict,
        clear: clear,
        init: init,
        document_fields : document_fields,
        getFieldsByDocumentTypeId: getFieldsByDocumentTypeId,
        document_fields_dict: document_fields_dict,
        create: create,
        edit: edit,
        delete: remove,
        getRequiredDocumentFieldIdsByDocumentTypeId: getRequiredDocumentFieldIdsByDocumentTypeId,
        getAll: getAll,
        getById: getById,
        clone: clone
    };
}]);
