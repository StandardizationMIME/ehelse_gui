"use strict";

angular.module("ehelseEditor").factory("DocumentType", ["$rootScope", "StorageHandler", function($rootScope, StorageHandler) {

    var document_types = [];
    var document_types_dict = {};
    var document_types_option_list = [];

    init();

    function init(){
        try{
            Array.prototype.push.apply(document_types, StorageHandler.getDocumentTypes().documentTypes);
            Array.prototype.push.apply(document_types_option_list, generateDocumentTypesOptionList(document_types));
            generateDocumentTypeDict(document_types);
        }
        catch(error){
            console.log("Document types could not be loaded: " + error);
            $rootScope.notifyError("Dokumenttyper kunne ikke lastes: " + error, 6000);
        }
    }

    /**
     * Function used to clear document type lists and dicts.
     */
    function clear(){
        document_types.length = 0;
        document_types_dict = {};
        document_types_option_list.length = 0;
    }

    /**
     * Function that generates DocumentType dict
     *
     * The document ype dict is used were only the id is available.
     * @param document_types
     */
    function generateDocumentTypeDict(document_types){
        for(var i = 0; i < document_types.length; i++){
            document_types_dict[document_types[i].id] = document_types[i];
        }
    }

    /**
     * Function generating document types option list.
     *
     * Used to generate option lists in the view.
     * @param document_types
     * @returns Document type options list
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

    function getAll(){
        return document_types;
    }

    return {
        clear: clear,
        init: init,
        getAll: getAll,
        document_types: document_types,
        document_types_dict: document_types_dict,
        document_types_option_list: document_types_option_list
    };
}]);