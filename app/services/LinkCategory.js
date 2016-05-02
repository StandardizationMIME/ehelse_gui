'use strict';

angular.module('ehelseEditor').factory('LinkCategory', ['$rootScope', function($rootScope) {
    var document_link_categories= [];
    var document_link_categories_dict = {};

    function retrieveLinkCategories(){
        $rootScope.get(
            'link-categories',
            function ( data ){
                document_link_categories.length = 0;
                Array.prototype.push.apply(document_link_categories, data.link_categories);
                generateLinkCategoryDict();
                console.log(document_link_categories_dict);

            },
            function (data) {
                console.log("No Link Categories found");
            }
        );
    }

    retrieveLinkCategories();

    function generateLinkCategoryDict(){
        for(var i = 0; i < document_link_categories.length; i++){
            document_link_categories_dict[document_link_categories[i].id] = document_link_categories[i];
        }
    }

    function createLinkCategory(linkCategory, success, error){
        console.log(linkCategory);
        $rootScope.post(
            'link-categories/',
            linkCategory,
            function (data) {
                document_link_categories.push(data);
                generateLinkCategoryDict();
                success(data);
            },
            error
        );
    }

    function removeLinkCategory(linkCategory){
        var index = document_link_categories.indexOf(linkCategory);
        if (index > -1) {
            document_link_categories.splice(index, 1);
        }
        console.log(document_link_categories_dict);
    };

    function deleteLinkCategory(linkCategory){
        $rootScope.delete(
            'link-categories/'+ linkCategory.id,
            function () {
                removeLinkCategory(linkCategory);
                generateLinkCategoryDict();
                $rootScope.notifySuccess("Link kategorien ble slettet!", 5000);
                console.log("Successfully deleted link category");
            },
            function () {
                $rootScope.notifyError("Kunne ikke slette", 5000);
            }
        );
    }

    function getLinkCategoryDict(){
        return document_link_categories_dict;
    }

    function getLinkCategories(){
        return document_link_categories;
    }

    function getById(id, success, error){
        $rootScope.get(
            'link-categories/' + id,
            function (data) {
                success(data);
            },
            error
        )
    }

    function editLinkCategory(linkCategory, success, error){
        $rootScope.put(
            'link-categories/' + linkCategory.id,
            linkCategory,
            function (data){
                var linkCat = document_link_categories_dict[data.id];
                linkCat.name = data.name;
                linkCat.description = data.description;
                success(data);
            },
            error
        )
    }

    return {
        editLinkCategory: editLinkCategory,
        getById: getById,
        deleteLinkCategory: deleteLinkCategory,
        createLinkCategory: createLinkCategory,
        getLinkCategories:getLinkCategories,
        getLinkCategoryDict:getLinkCategoryDict,
        document_link_categories: document_link_categories
    };
}]);