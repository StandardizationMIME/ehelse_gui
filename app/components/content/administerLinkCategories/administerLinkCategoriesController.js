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

    $scope.archivedLinkCategoriesButton = true;
    $scope.linkCategoriesHeadingClass = "white-color blue-background";
    $scope.archivedLinkCategoriesButtonClass = "btn btn-default pull-right";
    $scope.changeLinkCategoriesClass = function () {
        if ($scope.archivedLinkCategoriesButton == true){
            $scope.linkCategoriesHeadingClass = "white-color darkgray-background";
            $scope.archivedLinkCategoriesButtonClass = "btn btn-primary pull-right";
            $scope.archivedLinkCategoriesButton = false;
        } else {
            $scope.linkCategoriesHeadingClass = "white-color blue-background";
            $scope.archivedLinkCategoriesButtonClass = "btn btn-default pull-right";
            $scope.archivedLinkCategoriesButton = true;
        }
    };
    $scope.recoverLinkCategory = function (linkCategory) {
        linkCategory.isArchived = 0;
        $rootScope.notifySuccess("Link-kategorien ble gjenopprettet!", 1000);
    };

}]);
