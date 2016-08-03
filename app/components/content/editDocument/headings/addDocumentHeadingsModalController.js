"use strict";

angular.module("ehelseEditor").controller("AddDocumentHeadingsController",["$rootScope","$scope", "Document", "Heading",
    function($rootScope, $scope, Document, Heading) {

        // Save headingContent and heading values to scope for easier access in the html files
        $scope.headings = Heading.getAll();
        $scope.selected_headings_ids = [];
        $scope.document_headings_ids = Document.getCurrentDocumentHeadingsIds();

        // Close modal and add selected links or link categories to the document
        $scope.close = function (result){
            if (result == "add"){
                Document.extendCurrentDocumentHeadingsByHeadingsIds($scope.selected_headings_ids);
            }
        };
    }]);