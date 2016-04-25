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

    function generateLinkCategoryDict(){
        for(var i = 0; i < document_link_categories.length; i++){
            document_link_categories_dict[document_link_categories[i].id] = document_link_categories[i];
        }
    }


    function getLinkCategoryDict(){
        return document_link_categories_dict;
    }

    function getLinkCategories(){
        return document_link_categories;
    }

    retrieveLinkCategories();
    return {
        getLinkCategories:getLinkCategories,
        getLinkCategoryDict:getLinkCategoryDict
    };
}]);