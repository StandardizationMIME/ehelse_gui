"use strict";

angular.module("ehelseEditor").factory("Mandatory", ["$rootScope", "StorageHandler", "ServiceFunction", function($rootScope, StorageHandler, ServiceFunction) {

    var mandatory = [];
    var mandatory_dict = {};
    var mandatory_option_list = [];

    init();

    function init(){
        try{
            Array.prototype.push.apply(mandatory, StorageHandler.getMandatory().mandatory);
            generateMandatoryDict(mandatory);
            generateMandatoryOptionList(mandatory);
        }
        catch(error){
            console.log("Mandatories could not be loaded: " + error);
            $rootScope.notifyError("Obligatoriskheter kunne ikke lastes: " + error, 6000);
        }
    }

    /**
     * Function used to clear all Mandatory lists and dicts.
     */
    function clear(){
        mandatory.length = 0;
        mandatory_dict = {};
        mandatory_option_list.length = 0;
    }

    /**
     * Function creating a new mandatory
     * @returns {{id: null, name: string, description: string}}
     */
    function newMandatory(){
        return {
            id: null,
            name: "",
            description: "",
            isArchived: 0
        }
    }

    /**
     * Function adding a new mandatory to the mandatory list.
     *
     * Updates the mandatory dict and option list.
     * @param man
     */
    function add(man){
        mandatory.push(man);
        generateMandatoryDict(mandatory);
        generateMandatoryOptionList(mandatory);
    }

    /**
     * Function changing the values of mandatory a with the values of mandatory b.
     *
     * This is done to use that angluar updates the views when an object is changed.
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
     * Function cloning a mandatory object.
     * @param mandatory
     * @returns Mandatory
     */
    function clone(mandatory){
        var m = {};
        set(m, mandatory);
        return m;
    }

    /**
     * Function generating mandatory options list.
     *
     * Mandatory options list is used to generate option lists in the view.
     * @param mandatory
     */
    function generateMandatoryOptionList(mandatory){
        mandatory_option_list.length = 0;
        for (var i = 0; i < mandatory.length; i++) {
            mandatory_option_list.push({
                name: mandatory[i].name,
                value: mandatory[i].id
            });
        }
    }

    /**
     * Function generating mandatory dict.
     *
     * Mandatory dict is used to get the values based on the id.
     * @param mandatory
     */
    function generateMandatoryDict(mandatory){
        for(var i = 0; i < mandatory.length; i++){
            mandatory_dict[mandatory[i].id] = mandatory[i];
        }
    }

    /**
     * Function removing a mandatory from the mandatory list.
     *
     * Updates the mandatory dict and options list.
     * @param m
     */
    function archiveMandatory(m) {
        m.isArchived = 1;
        generateMandatoryDict(mandatory);
        generateMandatoryOptionList(mandatory);
    }

    /**
     * Function deleting a mandatory.
     *
     * Updates the mandatory dict and options list.
     * @param mandatory
     */
    function deleteMandatory(mandatory) {
        try{
            archiveMandatory(mandatory);
            $rootScope.notifySuccess("Obligatoriskhet ble arkivert!", 1000);
        }
        catch(error){
            console.log("Mandatory-value could not be archived: " + error);
            $rootScope.notifyError("Obligatoriskhet ble ikke arkivert: " + error, 6000);
        }
    }

    function initNewMandatoryValues(man){
        man.id = ServiceFunction.generateNewId(mandatory);
        man.isArchived = 0;
    }

    /**
     * Function creating or updating a mandatory based on if it has an id.
     *
     * Updates mandatory dict and options list.
     * @param man
     */
    function submit(man){
        if(man.id){
            try{
                set(mandatory_dict[man.id], man);
                generateMandatoryDict(mandatory);
                generateMandatoryOptionList(mandatory);
                $rootScope.notifySuccess("Obligatoriskhet ble oppdatert", 1000);
            }
            catch(error){
                console.log("Mandatory-value could not be updated: " + error);
                $rootScope.notifyError("Obligatoriskhet ble ikke oppdatert: " + error, 6000);
            }
        }
        else{
            try{
                initNewMandatoryValues(man);
                $rootScope.notifySuccess("Ny obligatoriskhet ble opprettet", 1000);
                add(man);
            }
            catch(error){
                console.log("Mandatory-value could not be created: " + error);
                $rootScope.notifyError("Obligatoriskhet ble ikke opprettet: " + error, 6000);
            }
        }
    }

    function getAll(){
        return mandatory;
    }

    function getAllAsDict(){
        return mandatory_dict;
    }

    function getAllAsOptionsList(){
        return mandatory_option_list;
    }

    function getById(id) {
        return mandatory_dict[id];
    }

    return {
        clear: clear,
        init: init,
        new: newMandatory,
        clone: clone,
        submit: submit,
        delete: deleteMandatory,

        getById: getById,
        getAll: getAll,
        getAllAsDict:getAllAsDict,
        getAllAsOptionsList:getAllAsOptionsList
    };
}]);