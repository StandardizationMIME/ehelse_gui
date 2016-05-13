"use strict";

angular.module("ehelseEditor").controller("AddEditLinkCategoriesController", ["$scope", "$rootScope", "LinkCategory", function($scope, $rootScope, LinkCategory) {

    $rootScope.postNewLinkCategory = LinkCategory.submit;


    $rootScope.submitLinkCategoryChange = LinkCategory.submit;


}]);