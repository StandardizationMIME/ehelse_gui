'use strict';

angular.module('ehelseEditor').controller('AdministerLinkCategoriesController',['$scope', '$rootScope', 'LinkCategory', function($scope, $rootScope, LinkCategory){

    $scope.linkCategory = LinkCategory.document_link_categories;

    $scope.showNewLinkCategoryModal = function(){
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal('app/components/content/administerLinkCategories/addEditLinkCategories/add-link-category-modal.html','AddEditLinkCategoriesController');
    };

    $scope.deleteLinkCategoryById = function (linkCategory) {
        LinkCategory.deleteLinkCategory(linkCategory);
    };

    $scope.showEditLinkCategoryModal = function (linkCategoryId) {
        $scope.getLinkCategoryById(linkCategoryId);
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal('app/components/content/administerLinkCategories/addEditLinkCategories/edit-link-category-modal.html', 'AddEditLinkCategoriesController');


    };

    $scope.getLinkCategoryById = function (id) {
        LinkCategory.getById(
            id,
            function(data){
                $rootScope.currentLinkCategory = data;
            },
            function () {
                console.log(error);
            }
        );
    }

/*
    $scope.actionsOptionList = Action.actions_option_list;

    $scope.showNewActionModal = function () {
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal('app/components/content/administerActions/addEditActions/add-action-modal.html', 'AddEditActionController');
    };

    $scope.deleteActionById = function (action) {

        Action.deleteAction(action);
    };

    $scope.getActionById = function (id) {

        Action.getById(
            id,
            function (data) {
                $rootScope.currentAction = data;
            },
            function () {
                console.log(error);
            }
        );
    };

    $scope.showEditActionModal = function (actionId) {
        $scope.getActionById(actionId);
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal('app/components/content/administerActions/addEditActions/edit-action-modal.html', 'AddEditActionController');
    };
*/
}]);
