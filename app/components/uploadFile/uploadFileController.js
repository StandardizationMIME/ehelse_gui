"use strict";

angular.module("ehelseEditor").controller("UploadFileController",
    ["$scope", "$rootScope", "FileUpload", "StorageHandler", "$state", "Action", "Document", "DocumentField", "DocumentType", "LinkCategory", "Mandatory", "Status", "TargetGroup", "Topic",
        function($scope, $rootScope, FileUpload, StorageHandler, $state, Action, Document, DocumentField, DocumentType, LinkCategory, Mandatory, Status, TargetGroup, Topic){

    $scope.$state = $state;

    $scope.readFileContent = function ($fileContent) {
        FileUpload.readContent($fileContent);
    };

    $scope.uploadFile = function(){
        $scope.$state.go("main-view.editor-view");
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
        TargetGroup.init();
        Topic.init();
    };

}]);


angular.module("ehelseEditor").directive('onReadFile', function ($parse) {
    return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attrs){
            var fn = $parse(attrs.onReadFile);

            element.on('change', function (onChangeEvent) {
                var reader = new FileReader();

                reader.onload = function (onLoadEvent) {
                    scope.$apply(function () {
                        fn(scope, {$fileContent:onLoadEvent.target.result});
                    });
                };
                reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
            });
        }
    };
});