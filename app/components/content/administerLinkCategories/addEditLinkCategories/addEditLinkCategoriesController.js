"use strict";

angular.module("ehelseEditor").controller("AddEditLinkCategoriesController", ["$scope", "$rootScope", "LinkCategory", function($scope, $rootScope, LinkCategory) {

    // Save link category values to scope for easier access int he html files
    $rootScope.postNewLinkCategory = LinkCategory.submit;
    $rootScope.submitLinkCategoryChange = LinkCategory.submit;

}]);