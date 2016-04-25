angular.module('ehelseEditor').controller('AddDocumentLinkCategoriesController',['$rootScope','$scope', 'Document', 'LinkCategory',
    function($rootScope, $scope, Document, LinkCategory) {

        $scope.link_categories = LinkCategory.getLinkCategories();
        $scope.selected_document_link_categories_ids = [];
        $scope.document_link_categories_ids = Document.getCurrentDocumentLinkCategoriesIds();
        console.log($scope.link_categories);
        console.log($scope.selected_document_fields_ids);
        console.log($scope.document_link_categories_ids);
        $scope.close = function (result){
            if (result == 'add'){
                Document.extendCurrentDocumentLinkCategoriesByLinkCategoriesIds($scope.selected_document_link_categories_ids);

            }
        };
    }]);