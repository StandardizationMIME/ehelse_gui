"use strict";

angular.module("ehelseEditor").controller("AdministerLinkCategoriesController",["$scope", "$rootScope", "LinkCategory", function($scope, $rootScope, LinkCategory){

    $scope.linkCategory = LinkCategory.getAll();

    $scope.showNewLinkCategoryModal = function(){
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal("app/components/content/administerLinkCategories/addEditLinkCategories/addLinkCategoryModal.html","AddEditLinkCategoriesController");
    };

    $scope.deleteLinkCategoryById = LinkCategory.delete;

    $scope.showEditLinkCategoryModal = function (linkCategoryId) {
        $rootScope.currentLinkCategory = LinkCategory.clone(LinkCategory.getById(linkCategoryId));
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal("app/components/content/administerLinkCategories/addEditLinkCategories/editLinkCategoryModal.html", "AddEditLinkCategoriesController");


    };



}]);
