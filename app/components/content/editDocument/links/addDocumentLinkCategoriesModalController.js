"use strict";

angular.module("ehelseEditor").controller("AddDocumentLinkCategoriesController",["$rootScope","$scope", "Document", "LinkCategory",
    function($rootScope, $scope, Document, LinkCategory) {

        // Save link- and link category values to scope for easier access in the html files
        $scope.link_categories = LinkCategory.getAll();
        $scope.document_link_categories_ids = Document.getCurrentDocumentLinkCategoriesIds();
        $scope.selected_document_link_categories_ids = [];

        // Close modal and add selected links or link categories to the document
        $scope.close = function (result){
            if (result == "add"){
                Document.extendCurrentDocumentLinkCategoriesByLinkCategoriesIds($scope.selected_document_link_categories_ids);
            }
        };
    }]);