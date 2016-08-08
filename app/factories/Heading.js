"use strict";

angular.module("ehelseEditor").factory("Heading", ["$rootScope", "StorageHandler", "ServiceFunction", function($rootScope, StorageHandler, ServiceFunction) {

    var headings = [];
    var headings_dict = {};

    init();

    function init(){
        try{
            Array.prototype.push.apply(headings, StorageHandler.getHeadings().headings);
            headings.sort(ServiceFunction.compareSequence);
            generateHeadingDict();
        }
        catch(error){
            console.log("Headings could not be loaded: " + error);
            $rootScope.notifyError("Overskrifter kunne ikke lastes: " + error, 6000);
        }
    }

    /**
     * Function used to clear all heading lists and dicts.
     */
    function clear(){
        headings.length = 0;
        headings_dict = {};
    }

    /**
     * Function used to create new Heading objects.
     * @returns Heading
     */
    function newHeading(){
        return {
            id: null,
            name: "",
            description: "",
            isArchived: 0,
            sequence: ""
        }
    }

    /**
     * Function used to clone Heading objects.
     * @param heading
     * @returns Heading
     */
    function clone(heading){
        var lk = {};
        set(lk, heading);
        return lk;
    }

    /**
     * Function used to update the values of heading a with the values of heading b.
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
        a.sequence = b.sequence;
    }

    /**
     * Function adding a heading object to the heading list.
     *
     * Updates the heading dict.
     * @param heading
     */
    function add(heading){
        headings.push(heading);
        generateHeadingDict();
    }

    /**
     * Function used to generate the heading dict.
     *
     * The heading dict is used to get the heading object by its id.
     */
    function generateHeadingDict(){
        for(var i = 0; i < headings.length; i++){
            headings_dict[headings[i].id] = headings[i];
        }
    }

    function initNewHeadingValues(heading){
        heading.id = ServiceFunction.generateNewId(headings);
        heading.isArchived = 0;
        heading.sequence = "1";
    }

    /**
     * Function creating or updating the heading based on if it got an id.
     *
     * Updates the heading dict.
     * @param heading
     */
    function submit(heading){
        if(heading.id){
            try{
                set(headings_dict[heading.id], heading);
                headings.sort(ServiceFunction.compareSequence);
                generateHeadingDict(headings);
                $rootScope.notifySuccess("Overskrift ble oppdatert",1000);
            }
            catch(error){
                console.log("Heading could not be updated: " + error);
                $rootScope.notifyError("Overskrift ble ikke oppdatert: " + error, 6000);
            }
        }
        else{
            try{
                initNewHeadingValues(heading);
                $rootScope.notifySuccess("Ny Overskrift ble opprettet.",1000);
                add(heading);
                headings.sort(ServiceFunction.compareSequence);
            }
            catch(error){
                console.log("Heading could not be created: " + error);
                $rootScope.notifyError("Overskrift ble ikke opprettet: " + error, 6000);
            }
        }
    }

    /**
     * Function removing a heading from the heading list.
     * @param heading
     */
    function archiveHeading(heading){
        heading.isArchived = 1;
        generateHeadingDict();
    }

    /**
     * Function deleting a heading.
     *
     * Updates the heading dict.
     * @param heading
     */
    function deleteHeading(heading){
        try{
            archiveHeading(heading);
            $rootScope.notifySuccess("Overskriften ble arkivert!", 1000);
        }
        catch(error){
            console.log("Heading could not be archived: " + error);
            $rootScope.notifyError("Overskrift ble ikke arkivert: " + error, 6000);
        }
    }

    function getAllAsDict(){
        return headings_dict;
    }


    function getById(id){
        return headings_dict[id];
    }


    function getAll(){
        return headings
    }

    return {
        clear: clear,
        init: init,
        new: newHeading,
        clone: clone,
        submit: submit,
        delete: deleteHeading,
        getById: getById,
        getAll: getAll,
        getAllAsDict: getAllAsDict
    };
}]);