
// Directives used in MainView.html
angular.module("ehelseEditor")
    .directive("toolbar",function(){
        return{
            restrict: "E",
            templateUrl: "app/components/toolbar/toolbarView.html"
        };
    })
    .directive("editorview",function(){
        return{
            restrict: "E",
            templateUrl: "app/components/editor/editorView.html"
        };
    })
    .directive("stringToNumber", function() {
        return {
            require: "ngModel",
            link: function(scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function(value) {
                    return "" + value;
                });
                ngModel.$formatters.push(function(value) {
                    return parseFloat(value, 10);
                });
            }
        }
    })
    .directive('onReadFile', ['$parse', '$rootScope', function ($parse, $rootScope) {
        return {
            restrict: 'A',
            scope: false,
            link: function(scope, element, attrs){
                var fn = $parse(attrs.onReadFile);

                choosenFileEntry = null;
                element.on('change', function (onChangeEvent) {
                    try {
                        if (chrome.fileSystem){
                            console.log("chrome.system read defined");
                            chrome.fileSystem.chooseEntry({type:'openWritableFile'}, function () {
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
                    } catch(error){{console.log("error", error.message)}}

                });
            }
        };
    }]);


