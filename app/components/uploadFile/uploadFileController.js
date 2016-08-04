"use strict";

angular.module("ehelseEditor").controller("UploadFileController",
    ["$state", "$scope", "$rootScope", "FileUpload", "StorageHandler", "Action", "Document", "DocumentField", "DocumentType", "LinkCategory", "Mandatory", "Status", "TargetGroup", "Topic", "ContactAddress", "Heading",
        function($state, $scope, $rootScope, FileUpload, StorageHandler, Action, Document, DocumentField, DocumentType, LinkCategory, Mandatory, Status, TargetGroup, Topic, ContactAddress, Heading){

    $scope.$state = $state;

    $scope.readFileContent = function ($fileContent) {
        FileUpload.readContent($fileContent);
    };

    $scope.uploadFile = function(){
        $scope.$state.go("main-view.editor-view");
    };

    $rootScope.clearEverything = function(){
        Action.clear();
        Document.clear();
        DocumentField.clear();
        DocumentType.clear();
        LinkCategory.clear();
        Mandatory.clear();
        Status.clear();
        ContactAddress.clear();
        Heading.clear();
        TargetGroup.clear();
        Topic.clear();
        $rootScope.deselectTopicAndDocument();
        $rootScope.changeContentView("");
    };

    $scope.initEverything = function(){
        StorageHandler.init();
        Action.init();
        Document.init();
        DocumentField.init();
        DocumentType.init();
        LinkCategory.init();
        Mandatory.init();
        Status.init();
        ContactAddress.init();
        Heading.init();
        TargetGroup.init();
        Topic.init();
    };

}]);


angular.module("ehelseEditor").directive('onReadFile', ['$parse', '$rootScope', function ($parse, $rootScope) {
    return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attrs){
            var fn = $parse(attrs.onReadFile);

            element.on('change', function (onChangeEvent) {
                var reader = new FileReader();
                try{
                    reader.onload = function (onLoadEvent) {
                        scope.$apply(function () {
                            fn(scope, {$fileContent:onLoadEvent.target.result});
                        });
                    };
                    reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
                }catch(error){
                    $rootScope.notifyError("Filen du prøver å laste opp er ugyldig!", 6000);
                    console.log("Upload failed: " + error);
                }
            });
        }
    };
}]);