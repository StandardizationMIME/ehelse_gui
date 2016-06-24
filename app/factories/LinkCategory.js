"use strict";

angular.module("ehelseEditor").factory("LinkCategory", ["$rootScope", "StorageHandler", "ServiceFunction", function($rootScope, StorageHandler, ServiceFunction) {

    var link_categories= [];
    var link_categories_dict = {};

    init();

    function init(){
        try{
            Array.prototype.push.apply(link_categories, StorageHandler.getLinkCategories().linkCategories);
            generateLinkCategoryDict();
        }
        catch(error){
            console.log("Link categories could not be loaded: " + error);
            $rootScope.notifyError("Linkkategorier kunne ikke lastes: " + error, 6000);
        }
    }

    /**
     * Function used to clear all link category lists and dicts.
     */
    function clear(){
        link_categories.length = 0;
        link_categories_dict = {};
    }

    /**
     * Function used to create new LinkCategory objects.
     * @returns LinkCategory
     */
    function newLinkCategory(){
        return {
            id: null,
            name: "",
            description: "",
            isArchived: 0
        }
    }

    /**
     * Function used to clone LinkCategory objects.
     * @param link_category
     * @returns LinkCategory
     */
    function clone(link_category){
        var lk = {};
        set(lk, link_category);
        return lk;
    }

    /**
     * Function used to update the values of link category a with the values of link category b.
     *
     * This is done to use that angular updates the views when a object changes.
     * @param a
     * @param b
     */
    function set(a, b){
        a.id = b.id;
        a.name = b.name;
        a.description = b.description;
        a.isArchived = b.isArchived;
    }

    /**
     * Function adding a link category object to the link category list.
     *
     * Updates the link category dict.
     * @param link_category
     */
    function add(link_category){
        link_categories.push(link_category);
        generateLinkCategoryDict();
    }

    /**
     * Function used to generate the link category dict.
     *
     * The link category dict is used to get the link category object by its id.
     */
    function generateLinkCategoryDict(){
        for(var i = 0; i < link_categories.length; i++){
            link_categories_dict[link_categories[i].id] = link_categories[i];
        }
    }

    function initNewLinkCategoryValues(link_category){
        link_category.id = ServiceFunction.generateNewId(link_categories);
        link_category.isArchived = 0;
    }

    /**
     * Function creating or updating the link category based on if it got an id.
     *
     * Updates the link category dict.
     * @param link_category
     */
    function submit(link_category){
        if(link_category.id){
            try{
                set(link_categories_dict[link_category.id], link_category);
                generateLinkCategoryDict(link_categories);
                $rootScope.notifySuccess("Lenke-kategori ble oppdatert",1000);
            }
            catch(error){
                console.log("Link category could not be updated: " + error);
                $rootScope.notifyError("Linkkategori ble ikke oppdatert: " + error, 6000);
            }
        }
        else{
            try{
                initNewLinkCategoryValues(link_category);
                $rootScope.notifySuccess("Ny Linkkategori ble opprettet.",1000);
                add(link_category);
            }
            catch(error){
                console.log("Link category could not be created: " + error);
                $rootScope.notifyError("Linkkategori ble ikke opprettet: " + error, 6000);
            }
        }
    }

    /**
     * Function removing a link category from the link category list.
     * @param linkCategory
     */
    function archiveLinkCategory(linkCategory){
        linkCategory.isArchived = 1;
        generateLinkCategoryDict();
    }

    /**
     * Function deleting a link category.
     *
     * Updates the link category dict.
     * @param linkCategory
     */
    function deleteLinkCategory(linkCategory){
        try{
            archiveLinkCategory(linkCategory);
            $rootScope.notifySuccess("Link-kategorien ble arkivert!", 1000);
        }
        catch(error){
            console.log("Link category could not be archived: " + error);
            $rootScope.notifyError("Linkkategori ble ikke arkivert: " + error, 6000);
        }
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
        clear: clear,
        init: init,
        new: newLinkCategory,
        clone: clone,
        submit: submit,
        delete: deleteLinkCategory,
        getById: getById,
        getAll: getAll,
        getAllAsDict: getAllAsDict
    };
}]);