angular.module("ehelseEditor").controller("AddDocumentFieldsController",["$rootScope","$scope", "Document", "DocumentField",
    function($rootScope, $scope, Document, DocumentField) {

    $scope.fields = DocumentField.getFieldsByDocumentTypeId(Document.getCurrentDocument().documentTypeId);
        $scope.selected_document_fields_ids = [];
        $scope.document_fields_ids = Document.getCurrentDocumentFieldIds();
    $scope.close = function (result){
        if (result == "add"){
            Document.extendCurrentDocumentFieldsByFieldIds($scope.selected_document_fields_ids);

        }else{
            $scope.selected_document_fields_ids = Document.getCurrentDocumentFieldIds();
        }
    };
}]);