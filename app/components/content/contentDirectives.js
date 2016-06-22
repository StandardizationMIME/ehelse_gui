
//Directives used in the content part of the GUI

angular.module("ehelseEditor").directive("standardfields",function () {
    return{
        restrict: "E",
        templateUrl: "app/components/content/administerFields/directives/standardFields.html"
    };
});

angular.module("ehelseEditor").directive("profilefields",function () {
    return{
        restrict: "E",
        templateUrl: "app/components/content/administerFields/directives/profileFields.html"
    };
});

angular.module("ehelseEditor").directive("supportdocumentfields",function () {
    return{
        restrict: "E",
        templateUrl: "app/components/content/administerFields/directives/supportDocumentFields.html"
    };
});

angular.module("ehelseEditor").directive("profilescontainer",function () {
    return{
        restrict: "E",
        templateUrl: "app/components/content/editDocument/profiles/profilesContainer.html"
    };
});

angular.module("ehelseEditor").directive("focusMe", function ($timeout, $parse) {
    return{
        link: function (scope, element, attrs, model) {
            var model = $parse(attrs.focusMe);
            scope.$watch(model, function(value) {
                if (value === true ){
                    $timeout(function () {
                        element[0].focus();
                    },150);
                }
            });
            element.bind("blur",function () {
                scope.$apply(model.assign(scope, false));
            })
        }
    };
});

angular.module("ehelseEditor").directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});