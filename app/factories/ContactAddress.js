"use strict";

angular.module("ehelseEditor").factory("ContactAddress", ["$rootScope", "StorageHandler", "ServiceFunction", function($rootScope, StorageHandler, ServiceFunction){

    var contact_addresses = [];
    var contact_address_dict = {};
    var contact_address_option_list = [];

    init();

    function init(){
        try{
            Array.prototype.push.apply(contact_addresses, StorageHandler.getContactAddresses().contactAddresses);
            generateContactAddressOptionList(contact_addresses);
            generateContactAddressDict(contact_addresses);
        }
        catch(error){
            console.log("ContactAddresses could not be loaded: " + error);
            $rootScope.notifyError("Kontaktadresser kunne ikke lastes: " + error, 6000);
        }
    }

    /**
     * Function used to clear all contact_addresses lists and dicts.
     */
    function clear(){
        contact_addresses.length = 0;
        contact_address_dict = {};
        contact_address_option_list.length = 0;
    }

    /**
     * Function generating the contact_address_dict. Used to get the name of the contact_address from the contact_address id.
     * @param contact_addresses
     */
    function generateContactAddressDict(contact_addresses){
        for(var i = 0; i < contact_addresses.length; i++){
            contact_address_dict[contact_addresses[i].id] = contact_addresses[i];
        }
    }

    /**
     * Function creating new contact_address.
     * @returns {{id: null, name: string, description: string}}
     */
    function newContactAddress(){
        return {
            id: null,
            name: "",
            description: "",
            isArchived: 0
        }
    }

    /**
     * Function cloning a contact_address.
     * @param s
     * @returns {{}}
     */
    function clone(s){
        var cs = {};
        set(cs, s);
        return cs;
    }

    /**
     * Function updating the values of contact_address a with the values in contact_address b.
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
     * Function used to add a new contact_address to the list of contact_addresses.
     *
     * Also updates the dict and options list.
     * @param s
     */
    function add(s){
        contact_addresses.push(s);
        generateContactAddressDict(contact_addresses);
        generateContactAddressOptionList(contact_addresses);
    }

    /**
     * Function used to generate the contact_address options list.
     *
     * Used to generate options lists in the views.
     * @param contact_addresses
     */
    function generateContactAddressOptionList(contact_addresses){
        contact_address_option_list.length = 0;
        for (var i = 0; i < contact_addresses.length; i++){
            contact_address_option_list.push({
                value: contact_addresses[i].id,
                name: contact_addresses[i].name,
                isArchived: contact_addresses[i].isArchived
            })
        }
    }

    function initNewContactAddressValues(contact_address){
        contact_address.id = ServiceFunction.generateNewId(contact_address);
        contact_address.isArchived = 0;
    }

    /**
     * Function creating or updating contact_addresses based on if they have an id or not.
     * @param contact_address
     */
    function submit(contact_address){
        if(contact_address.id){
            try{
                set(contact_address_dict[contact_address.id], contact_address);
                generateContactAddressDict(contact_address);
                generateContactAddressOptionList(contact_address);
                $rootScope.notifySuccess("Kontaktadressen ble oppdatert", 1000);
            }
            catch(error){
                console.log("ContactAddress could not be updated: " + error);
                $rootScope.notifyError("Kontaktadressen ble ikke oppdatert: " + error, 6000);
            }
        }
        else{
            try{
                initNewContactAddressValues(contact_address);
                add(contact_address);
                $rootScope.notifySuccess("Ny kontaktadresse ble opprettet", 1000);
            }
            catch(error){
                console.log("ContactAddress could not be created: " + error);
                $rootScope.notifyError("Kontaktadresse ble ikke opprettet: " + error, 6000);
            }
        }
    }

    /**
     * Function used to remove contact_addresses from the contact_address list.
     * @param s
     */
    function archiveContactAddress(s){
        s.isArchived = 1;
        generateContactAddressDict(contact_addresses);
        generateContactAddressOptionList(contact_addresses);
    }

    /**
     * Function used to delete contact_addresses
     * @param contact_address
     */
    function deleteContactAddress(contact_address) {
        try{
            archiveContactAddress(contact_address);
            $rootScope.notifySuccess("Kontaktadressen ble arkivert!", 1000);
        }
        catch(error){
            console.log("ContactAddress could not be archived: " + error);
            $rootScope.notifyError("Kontaktadressen ble ikke arkivert: " + error, 6000);
        }
    }

    function getById(id){
        return contact_address_dict[id];
    }

    function getAll(){
        return contact_addresses;
    }

    function getAllAsOptionsList(){
        return contact_address_option_list;
    }

    function getAllAsDict(){
        return contact_address_dict;
    }

    return {
        clear: clear,
        init: init,
        new: newContactAddress,
        clone: clone,

        getById: getById,
        getAll: getAll,
        getAllAsDict: getAllAsDict,
        getAllAsOptionsList: getAllAsOptionsList,

        delete: deleteContactAddress,
        submit: submit
    }
}]);