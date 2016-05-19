"use strict";

angular.module("ehelseEditor").factory("DocumentType", ["$rootScope", function($rootScope) {

    var document_types = [];
    var document_types_dict = {};
    var document_types_option_list = [];

    /**
     * Function call retrieving document types from the server.
     */
    $rootScope.get(
        "document-types",
        function ( data ){
            Array.prototype.push.apply(document_types, data.documentTypes);
            Array.prototype.push.apply(document_types_option_list, generateDocumentTypesOptionList(document_types));
            generateDocumentTypeDict(document_types);
        },
        function (data) {
            console.log("No document types found");
        }
    );

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

    return {
        document_types : document_types,
        document_types_dict: document_types_dict,
        document_types_option_list : document_types_option_list
    };
}]);