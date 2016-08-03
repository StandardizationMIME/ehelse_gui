"use strict";

angular.module("ehelseEditor").controller("AddDocumentHeadingsController",["$rootScope","$scope", "Document", "Heading",
    function($rootScope, $scope, Document, Heading) {

        $scope.document_heading_ids = Document.getCurrentDocumentHeadingContentIds();
        $scope.all_headings = Heading.getAll();
        $scope.selected_headings_ids = [];

        $scope.headingAlreadyIsAdded = function(id){
            for (var i = 0; i < $scope.document_heading_ids.length; i++) {
                if($scope.document_heading_ids[i] == id){
                    return true;
                }
            }
            return false;
        };

        $scope.close = function (result){
            if (result == "add"){
                //Document.extendCurrentDocumentLinkCategoriesByLinkCategoriesIds($scope.selected_document_link_categories_ids);
            }
        };

    }]);