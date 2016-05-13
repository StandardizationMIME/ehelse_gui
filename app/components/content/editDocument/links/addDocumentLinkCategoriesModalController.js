angular.module("ehelseEditor").controller("AddDocumentLinkCategoriesController",["$rootScope","$scope", "Document", "LinkCategory",
    function($rootScope, $scope, Document, LinkCategory) {

        $scope.link_categories = LinkCategory.getAll();
        $scope.selected_document_link_categories_ids = [];
        $scope.document_link_categories_ids = Document.getCurrentDocumentLinkCategoriesIds();
  
        $scope.close = function (result){
            if (result == "add"){
                Document.extendCurrentDocumentLinkCategoriesByLinkCategoriesIds($scope.selected_document_link_categories_ids);

            }
        };
    }]);