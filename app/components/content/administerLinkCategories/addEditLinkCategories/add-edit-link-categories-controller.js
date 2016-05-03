'use strict';

angular.module('ehelseEditor').controller('AddEditLinkCategoriesController', ['$scope', '$rootScope', 'LinkCategory', function($scope, $rootScope, LinkCategory) {

    $rootScope.submitLinkCategoryChange = function (linkCategory) {

    };

    $rootScope.postNewLinkCategory = LinkCategory.submit;


    $rootScope.submitLinkCategoryChange = LinkCategory.submit;


}]);