"use strict";

angular.module("ehelseEditor").controller("AddDocumentHeadingsController",["$rootScope","$scope", "Document", "Heading",
    function($rootScope, $scope, Document, Heading) {

        // Save ...............
        $scope.all_headings = Heading.getAll();
        $scope.document_heading_ids = Document.getCurrentDocumentHeadingContentIds();
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
                console.log($scope.selected_headings_ids);
                Document.addHeadingsToDocumentByIds($scope.selected_headings_ids);
            }
        };

    }]);