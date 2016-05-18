"use strict";

angular.module("ehelseEditor").factory("LinkCategory", ["$rootScope", function($rootScope) {
    var link_categories= [];
    var link_categories_dict = {};

    $rootScope.get(
        "link-categories",
        function ( data ){
            link_categories.length = 0;
            Array.prototype.push.apply(link_categories, data.link_categories);
            generateLinkCategoryDict();

        },
        function (data) {
            console.log("No Link Categories found");
        }
    );

    function newLinkCategory(){
        return {
            id: null,
            name: "",
            description: ""
        }
    }

    function clone(link_category){
        var lk = {};
        set(lk, link_category);
        return lk;
    }

    function set(a, b){
        a.id = b.id;
        a.name = b.name;
        a.description = b.description;
    }

    function add(link_category){
        link_categories.push(link_category);
        generateLinkCategoryDict();
    }


    function generateLinkCategoryDict(){
        for(var i = 0; i < link_categories.length; i++){
            link_categories_dict[link_categories[i].id] = link_categories[i];
        }
    }



    function submit(link_category){


        if(link_category.id){
            $rootScope.put(
                "link-categories/"+link_category.id,
                link_category,
                function(data){
                    set(link_categories_dict[data.id], data);
                    generateLinkCategoryDict(link_categories);
                    $rootScope.notifySuccess("Lenke-kategori ble oppdatert",1000);

                },
                function(data){
                    $rootScope.notifyError("Lenke-kategori ble ikke oppdatert.",6000);
                });
        }
        else{
            $rootScope.post(
                "link-categories/",
                link_category,
                function(data){
                    $rootScope.notifySuccess("Ny målgruppe ble opprettet.",1000);
                    add(data);
                },function(){
                    $rootScope.notifyError("Målgruppe ble ikke opprettet.",6000);
                }
            );
        }
    }



    function removeLinkCategory(linkCategory){
        var index = link_categories.indexOf(linkCategory);
        if (index > -1) {
            link_categories.splice(index, 1);
        }
    }

    function deleteLinkCategory(linkCategory){
        $rootScope.delete(
            "link-categories/"+ linkCategory.id,
            function () {
                removeLinkCategory(linkCategory);
                generateLinkCategoryDict();
                $rootScope.notifySuccess("Link-kategorien ble slettet!", 1000);
            },
            function () {
                $rootScope.notifyError("Kunne ikke slette", 6000);
            }
        );
    }

    function getAllAsDict(){
        return link_categories_dict;
    }


    function getById(id){
        return link_categories_dict[id];
    }


    function getAll(){
        return link_categories
    }

    return {
        new: newLinkCategory,
        clone: clone,
        submit: submit,
        delete: deleteLinkCategory,
        getById: getById,
        getAll: getAll,
        getAllAsDict: getAllAsDict
    };
}]);