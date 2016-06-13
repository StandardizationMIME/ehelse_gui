"use strict";

angular.module("ehelseEditor").controller("UploadFileController", ["$scope", "$rootScope", "FileUpload", "StorageHandler", function($scope, $rootScope, FileUpload, StorageHandler){


    $scope.readFileContent = function ($fileContent) {
        FileUpload.readContent($fileContent);
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