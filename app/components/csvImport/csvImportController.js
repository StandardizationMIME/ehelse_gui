"use strict";

angular.module("ehelseEditor").controller("CSVImportController",
    ["$scope","$rootScope","CSVConverter", "FileUpload", "StorageHandler", "$state", "Action", "Document", "DocumentField", "DocumentType", "LinkCategory", "Mandatory", "Status", "TargetGroup", "Topic",
    function($scope,$rootScope, CSVConverter, FileUpload, StorageHandler, $state, Action, Document, DocumentField, DocumentType, LinkCategory, Mandatory, Status, TargetGroup, Topic){

    $scope.showCSVContent = function ($fileContentCsv) {
        CSVConverter.uploadCSVContent($fileContentCsv);
        StorageHandler.initCsv();
        Action.init();
        Document.init();
        DocumentField.init();
        DocumentType.init();
        LinkCategory.init();
        Mandatory.init();
        Status.init();
        TargetGroup.init();
        Topic.init();
    };



}]);