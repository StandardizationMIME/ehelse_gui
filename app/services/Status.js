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
            description: ""
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
                name: status[i].name
            })
        }
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

            //************************************************************************************
            //$rootScope.put("status/"+status.id,
            //    status,
            //    function(data){
            //        set(status_dict[data.id], data);
            //        generateStatusDict(status);
            //        generateStatusOptionList(status);
            //        $rootScope.notifySuccess("Status ble oppdatert",1000);
            //
            //    },
            //    function(data){
            //        $rootScope.notifyError("Status ble ikke oppdatert.",6000);
            //    }
            //);
            //************************************************************************************
        }
        else{
            try{
                status.id = ServiceFunction.generateNewId(status);
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
    function removeStatus(s){
        var index = status.indexOf(s);
        if (index > -1) {
            status.splice(index,1)
        }
    }

    /**
     * Function used to delete statuses
     * @param status
     */
    function deleteStatus(status) {
        try{
            removeStatus(status);
            generateStatusDict(status);
            generateStatusOptionList(status);
            $rootScope.notifySuccess("Status ble slettet!", 1000);
        }
        catch(error){
            console.log("Status could not be deleted: " + error);
            $rootScope.notifyError("Status ble ikke slettet: " + error, 6000);
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