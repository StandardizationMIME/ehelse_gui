"use strict";

angular.module("ehelseEditor").factory("Status", ["$rootScope", "StorageHandler", "ServiceFunction", function($rootScope, StorageHandler, ServiceFunction){

    var status = [];
    var status_dict = {};
    var status_option_list = [];

    init();

    function init(){
        try{
            Array.prototype.push.apply(status, StorageHandler.getStatus().status);
            generateStatusOptionList(status);
            generateStatusDict(status);
        }
        catch(error){
            console.log("Statuses could not be loaded: " + error);
            $rootScope.notifyError("Statuser kunne ikke lastes: " + error, 6000);
        }
    }

    /**
     * Function generating the status_dict. Used to get the name of the status from the status id.
     * @param status
     */
    function generateStatusDict(status){
        for(var i = 0; i < status.length; i++){
            status_dict[status[i].id] = status[i];
        }
    }

    /**
     * Function creating new status.
     * @returns {{id: null, name: string, description: string}}
     */
    function newStatus(){
        return {
            id: null,
            name: "",
            description: "",
            isArchived: 0
        }
    }

    /**
     * Function cloning a status.
     * @param s
     * @returns {{}}
     */
    function clone(s){
        var cs = {};
        set(cs, s);
        return cs;
    }

    /**
     * Function updating the values of status a with the values in status b.
     *
     * This is done to make use of the fact that angular updates the view when the object is changed.
     * @param a
     * @param b
     */
    function set(a,b){
        a.id = b.id;
        a.name = b.name;
        a.description = b.description;
        a.isArchived = b.isArchived;
    }

    /**
     * Function used to add a new status to the list of statuses.
     *
     * Also updates the dict and options list.
     * @param s
     */
    function add(s){
        status.push(s);
        generateStatusDict(status);
        generateStatusOptionList(status);
    }

    /**
     * Function used to generate the status options list.
     *
     * Used to generate options lists in the views.
     * @param status
     */
    function generateStatusOptionList(status){
        status_option_list.length = 0;
        for (var i = 0; i < status.length; i++){
            status_option_list.push({
                value: status[i].id,
                name: status[i].name,
                isArchived: status[i].isArchived
            })
        }
    }

    function initNewStatusValues(status){
        status.id = ServiceFunction.generateNewId(status);
        status.isArchived = 0;
    }

    /**
     * Function creating or updating statuses based on if they have an id or not.
     * @param status
     */
    function submit(status){
        if(status.id){
            try{
                set(status_dict[status.id], status);
                generateStatusDict(status);
                generateStatusOptionList(status);
                $rootScope.notifySuccess("Status ble oppdatert", 1000);
            }
            catch(error){
                console.log("Status could not be updated: " + error);
                $rootScope.notifyError("Status ble ikke oppdatert: " + error, 6000);
            }
        }
        else{
            try{
                initNewStatusValues(status);
                add(status);
                $rootScope.notifySuccess("Ny status ble opprettet", 1000);
            }
            catch(error){
                console.log("Status could not be created: " + error);
                $rootScope.notifyError("Status ble ikke opprettet: " + error, 6000);
            }
        }
    }

    /**
     * Function used to remove statuses from the status list.
     * @param s
     */
    function archiveStatus(s){
        s.isArchived = 1;
        generateStatusDict(status);
        generateStatusOptionList(status);
    }

    /**
     * Function used to delete statuses
     * @param status
     */
    function deleteStatus(status) {
        try{
            archiveStatus(status);
            $rootScope.notifySuccess("Status ble arkivert!", 1000);
        }
        catch(error){
            console.log("Status could not be archived: " + error);
            $rootScope.notifyError("Status ble ikke arkivert: " + error, 6000);
        }
    }

    function getById(id){
        return status_dict[id];
    }

    function getAll(){
        return status;
    }

    function getAllAsOptionsList(){
        return status_option_list;
    }

    function getAllAsDict(){
        return status_dict;
    }

    return {
        init: init,
        new: newStatus,
        clone: clone,

        getById: getById,
        getAll: getAll,
        getAllAsDict: getAllAsDict,
        getAllAsOptionsList: getAllAsOptionsList,

        delete: deleteStatus,
        submit: submit
    }
}]);