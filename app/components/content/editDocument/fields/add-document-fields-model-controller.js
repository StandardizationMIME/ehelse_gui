angular.module('ehelseEditor').controller('AddDocumentFieldsController',['$rootScope','$scope', 'Document', 'DocumentField',
    function($rootScope, $scope, Document, DocumentField) {

    $scope.fields = DocumentField.getFieldsByDocumentTypeId(Document.getDocument().documentTypeId);
         $scope.selected_document_fields_ids = [];
        $scope.document_fields_ids = Document.getDocumentFieldIds();
    $scope.close = function (result){
        if (result == 'add'){
            Document.extendDocumentFieldsByFieldIds($scope.selected_document_fields_ids);

        }else{
            $scope.selected_document_fields_ids = Document.getDocumentFieldIds();
        }
    };
}]);