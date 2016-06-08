"use strict";

angular.module("ehelseEditor").factory("LinkCategory", ["$rootScope", function($rootScope) {
    var link_categories= [];
    var link_categories_dict = {};

    link_categories.length = 0;
    Array.prototype.push.apply(link_categories, $rootScope.getLinkCategories().link_categories);
    generateLinkCategoryDict();


    /**
     * Function call used to retrieve link categories from the server
     */
    /************************************************************************************
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
    );*************************************************************************************/

    /**
     * Function used to create new LinkCategory objects.
     * @returns LinkCategory
     */
    function newLinkCategory(){
        return {
            id: null,
            name: "",
            description: ""
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

    /**
     * Function creating or updating the link category based on if it got an id.
     *
     * Updates the link category dict.
     * @param link_category
     */
    function submit(link_category){
        if(link_category.id){
            set(link_categories_dict[link_category.id], link_category);
            generateLinkCategoryDict(link_categories);
            $rootScope.notifySuccess("Lenke-kategori ble oppdatert",1000);

            /******************************************************************************
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
                }
            );*******************************************************************************/
        }
        else{
            $rootScope.notifySuccess("Ny målgruppe ble opprettet.",1000);
            add(link_category);

            /********************************************************************************
            $rootScope.post(
                "link-categories/",
                link_category,
                function(data){
                    $rootScope.notifySuccess("Ny målgruppe ble opprettet.",1000);
                    add(data);
                },function(){
                    $rootScope.notifyError("Målgruppe ble ikke opprettet.",6000);
                }
            );********************************************************************************/
        }
    }

    /**
     * Function removing a link category from the link category list.
     * @param linkCategory
     */
    function removeLinkCategory(linkCategory){
        var index = link_categories.indexOf(linkCategory);
        if (index > -1) {
            link_categories.splice(index, 1);
        }
    }

    /**
     * Function deleting a link category.
     *
     * Updates the link category dict.
     * @param linkCategory
     */
    function deleteLinkCategory(linkCategory){

        removeLinkCategory(linkCategory);
        generateLinkCategoryDict();
        $rootScope.notifySuccess("Link-kategorien ble slettet!", 1000);

        /*********************************************************************************************
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
        );**********************************************************************************************/
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