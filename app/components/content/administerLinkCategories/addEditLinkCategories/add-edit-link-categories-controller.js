'use strict';

angular.module('ehelseEditor').controller('AddEditLinkCategoriesController', ['$scope', '$rootScope', 'LinkCategory', function($scope, $rootScope, LinkCategory) {

    $rootScope.submitLinkCategoryChange = function (linkCategory) {

    };

    $rootScope.postNewLinkCategory = function (linkCategory) {
        LinkCategory.createLinkCategory(linkCategory,
            function (data) {
                console.log("Link Category has been created");
                $rootScope.notifySuccess("Link kategori har blitt opprettet", 5000);
            },
            function () {
                $rootScope.notifyError("Error: Link kategori ble ikke opprettet!", 5000);
            });
    };


    $rootScope.submitLinkCategoryChange = function (linkCategory) {
        LinkCategory.editLinkCategory(
            linkCategory,
            function (data) {
                console.log("LinkCategory has been edited");
                $rootScope.notifySuccess("Endring har blitt lagret", 5000);
            },
            function () {
                $rootScope.notifyError("Error: Endring ble ikke lagret", 5000);
            }
        );
    };
/*
    $rootScope.submitActionChange = function (action) {
        Action.editAction(
            action,
            function (data) {
                console.log("Action has been edited");
                $rootScope.notifySuccess("Endring har blit lagret", 5000);
            },
            function () {
                $rootScope.notifyError("Error: Endring ble ikke lagret!", 5000);
            }
        );
    };

    $scope.postNewAction = function (action) {

        Action.createAction(action,
            function (data){
                console.log("Action has been created");
                $rootScope.notifySuccess("Hendelse har blitt opprettet", 5000);
            },
            function () {
                $rootScope.notifyError("Error: Hendelse ble ikke opprettet!", 5000);
            });
    };
*/

}]);