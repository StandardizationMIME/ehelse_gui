"use strict";

angular.module("ehelseEditor").factory("Mandatory", ["$rootScope", function($rootScope) {

    var mandatory = [];
    var mandatory_dict = {};
    var mandatory_option_list = [];

    var getMandatories =
    {
        mandatory:
            [
                {
                    description: "asdasd",
                    id: 1,
                    name: "Obligatorisk"
                },
                {
                    description: "asdasd",
                    id: 3,
                    name: "Anbefalt"
                },
                {
                    description: "asdasd",
                    id: 12,
                    name: "Frivillig"
                }
            ]
    };

    Array.prototype.push.apply(mandatory, getMandatories.mandatory);
    generateMandatoryDict(mandatory);
    generateMandatoryOptionList(mandatory);

    /**********************************************************************************************
     * Function retrieving mandatory from the server
     */
    /*$rootScope.get(
        "mandatory/",
        function ( data ){
            Array.prototype.push.apply(mandatory, data.mandatory);
            generateMandatoryDict(mandatory);
            generateMandatoryOptionList(mandatory);
        },
        function (data) {
            console.log("No document types found");
        }
    );*********************************************************************************************/

    /**
     * Function creating a new mandatory
     * @returns {{id: null, name: string, description: string}}
     */
    function newMandatory(){
        return {
            id: null,
            name: "",
            description: ""
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
    function removeMandatory(m) {
        var index = mandatory.indexOf(m);
        if (index > -1) {
            mandatory.splice(index,1);
        }
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
        removeMandatory(mandatory);
        generateMandatoryOptionList(mandatory);
        $rootScope.notifySuccess("Obligatoriskhet ble slettet!", 1000);

        /*********************************************************************************************
        $rootScope.delete(
            "mandatory/" + mandatory.id,
            function () {
                removeMandatory(mandatory);
                generateMandatoryOptionList(mandatory);
                $rootScope.notifySuccess("Obligatoriskhet ble slettet!", 1000);
            },
            function () {
                $rootScope.notifyError("Kunne ikke slette obligatoriskhet", 6000);
            }
        );*********************************************************************************************/
    }

    /**
     * Function creating or updating a mandatory based on if it has an id.
     *
     * Updates mandatory dict and options list.
     * @param man
     */
    function submit(man){
        if(man.id){
            set(mandatory_dict[man.id], man);
            generateMandatoryDict(mandatory);
            generateMandatoryOptionList(mandatory);
            $rootScope.notifySuccess("Obligatoriskhet ble oppdatert", 1000);

            /*********************************************************************************************
            $rootScope.put("mandatory/"+man.id,
                man,
                function(data){
                    set(mandatory_dict[data.id], data);
                    generateMandatoryDict(mandatory);
                    generateMandatoryOptionList(mandatory);
                    $rootScope.notifySuccess("Obligatoriskhet ble oppdatert",1000);

                },
                function(data){
                    $rootScope.notifyError("Obligatoriskhet ble ikke oppdatert.",6000);
                }
            );*********************************************************************************************/
        }
        else{
            $rootScope.notifySuccess("Ny obligatoriskhet ble opprettet", 1000);
            add(man);

            /*********************************************************************************************
            $rootScope.post(
                "mandatory/",
                man,
                function(data){
                    $rootScope.notifySuccess("Ny obligatoriskhet ble opprettet.",1000);
                    add(data);
                },function(){
                    $rootScope.notifyError("Obligatoriskhet ble ikke opprettet.",6000);
                }
            );*********************************************************************************************/
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