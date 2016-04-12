'use strict';

angular.module('ehelseEditor').factory('DocumentType', ['$rootScope', function($rootScope) {

    var document_types = [];
    var document_types_option_list = [];

    function getDocumentTypes(){
        $rootScope.get(
            'document-types',
            function ( data ){
                Array.prototype.push.apply(document_types, data.documentTypes);
                Array.prototype.push.apply(document_types_option_list, generateDocumentTypesOptionList(document_types));
            },
            function (data) {
                console.log("No document types found");
            }
        )
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

    return {
        document_types : document_types,
        document_types_option_list : document_types_option_list
    };
}]);