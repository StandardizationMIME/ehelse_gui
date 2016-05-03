'use strict';

angular.module('ehelseEditor').controller('AdministerLinkCategoriesController',['$scope', '$rootScope', 'LinkCategory', function($scope, $rootScope, LinkCategory){

    $scope.linkCategory = LinkCategory.getAll();

    $scope.showNewLinkCategoryModal = function(){
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal('app/components/content/administerLinkCategories/addEditLinkCategories/add-link-category-modal.html','AddEditLinkCategoriesController');
    };

    $scope.deleteLinkCategoryById = LinkCategory.delete;

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
    };

}]);
