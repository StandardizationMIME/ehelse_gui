"use strict";

angular.module("ehelseEditor").factory("Status",["$rootScope",function($rootScope){

    var status = [];
    var status_dict = {};
    var status_option_list = [];

    var getStatuses =
    {
        status:
            [
                {
                    description: "asd",
                    id: 1,
                    name: "Aktiv"
                },
                {
                    description: "asd",
                    id: 2,
                    name: "Ikke i refkat"
                },
                {
                    description: "asd",
                    id: 81,
                    name: "Under innfasing"
                }
            ]
    };

    Array.prototype.push.apply(status, getStatuses.status);
    generateStatusOptionList(status);
    generateStatusDict(status);

    /**************************************************************************************
     * Function retrieving statuses from the server
     */
    //$rootScope. get(
    //    "status/",
    //    function (data){
    //        Array.prototype.push.apply(status, data.status);
    //        generateStatusOptionList(status);
    //        generateStatusDict(status);
    //    },
    //    function (data){
    //
    //    }
    //);************************************************************************************

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

            set(status_dict[status.id], status);
            generateStatusDict(status);
            generateStatusOptionList(status);
            $rootScope.notifySuccess("Status ble oppdatert", 1000);

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

            add(status);
            $rootScope.notifySuccess("Ny status ble opprettet", 1000);

            /*************************************************************************************
            $rootScope.post(
                "status/",
                status,
                function(data){
                    $rootScope.notifySuccess("Ny status ble opprettet.",1000);
                    add(data);
                },function(){
                    $rootScope.notifyError("Status ble ikke opprettet.",6000);
                }
            );
            *************************************************************************************/
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

        removeStatus(status);
        generateStatusDict(status);
        generateStatusOptionList(status);
        $rootScope.notifySuccess("Status ble slettet!", 1000);

        /********************************************************************************************
        $rootScope.delete(
            "status/" + status.id,
            function (){
                removeStatus(status);
                generateStatusDict(status);
                generateStatusOptionList(status);
                $rootScope.notifySuccess("Status ble slettet!", 1000);
            },
            function (){
                $rootScope.notifyError("Kunne ikke slette", 6000);
            }
        );*********************************************************************************************/
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