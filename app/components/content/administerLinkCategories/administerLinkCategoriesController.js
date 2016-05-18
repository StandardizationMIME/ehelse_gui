"use strict";

angular.module("ehelseEditor").controller("AdministerLinkCategoriesController",["$scope", "$rootScope", "LinkCategory", function($scope, $rootScope, LinkCategory){

    // Save link category values to scope for easier access in the html files
    $scope.linkCategory = LinkCategory.getAll();
    $scope.deleteLinkCategoryById = LinkCategory.delete;

    // Open modal for creating new link category
    $scope.showNewLinkCategoryModal = function(){
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal("app/components/content/administerLinkCategories/addEditLinkCategories/addLinkCategoryModal.html","AddEditLinkCategoriesController");
    };

    // Open modal for editing link category
    $scope.showEditLinkCategoryModal = function (linkCategoryId) {
        $rootScope.currentLinkCategory = LinkCategory.clone(LinkCategory.getById(linkCategoryId));
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal("app/components/content/administerLinkCategories/addEditLinkCategories/editLinkCategoryModal.html", "AddEditLinkCategoriesController");


    };



}]);
