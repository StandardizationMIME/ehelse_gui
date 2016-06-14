"use strict";

angular.module("ehelseEditor").factory("Action", ["$rootScope", "StorageHandler", "ServiceFunction", function($rootScope, StorageHandler, ServiceFunction) {

    var actions = [];
    var actions_dict = {};
    var actions_option_list = [];

    init();

    function init(){
        try{
            Array.prototype.push.apply(actions, StorageHandler.getActions().actions);
            generateActionsOptionList(actions);
            generateActionsDict(actions);
        }
        catch(error){
            $rootScope.notifyError("Handlinger kunne ikke lastes: " + error, 6000);
            console.log("Actions did not load " + error);
        }
    }

    /**
     * Function creating a new action
     * @returns Action
     */
    function newAction(){
        return {
            id: null,
            name: "",
            description: ""
        };
    }

    /**
     * Function updating the content of the a object to match the content of b
     *
     * This is done to take advantage of angular listening of changes to an object.
     * If the object is changed insted of replaced is the cahnge reflected in the gui.
     * @param a
     * @param b
     */
    function set(a, b){
        a.id = b.id;
        a.name = b.name;
        a.description = b.description;
    }

    /**
     * Add a newly created Action to the list of actions and regenerates the action_dict and the actions_options_list
     * @param action
     */
    function add(action){
        actions.push(action);
        generateActionsDict(actions);
        generateActionsOptionList(actions);
    }

    /**
     * Function returning a clone of a Action object.
     *
     * The object can then be changed while maintaining a copy of the original action
     * @param action
     * @returns Action
     */
    function clone(action){
        var a = {};
        set(a, action);
        return a;
    }

    /**
     * Function generating an name, value pairs to be used in option lists.
     * @param actions
     */
    function generateActionsOptionList(actions){
        actions_option_list.length = 0;
        for (var i = 0; i < actions.length; i++) {
            actions_option_list.push({
                name: actions[i].name,
                value: actions[i].id
            });
        }
    }

    /**
     * Function generating a dict of actions with the actions id as key.
     *
     * Used to display the name of the action in places were only the id is available
     * @param actions
     */
    function generateActionsDict(actions){
        for(var i = 0; i < actions.length; i++){
            actions_dict[actions[i].id] = actions[i];
        }
    }

    /**
     * Function posting or updating an action based on if the action has an id or not.
     * @param action
     */
    function submit(action){
        //Having an id indicates the action is stored in the database and only needs to be updated
        if(action.id){
            try{
                set(actions_dict[action.id], action);
                generateActionsDict(actions);
                generateActionsOptionList(actions);
                $rootScope.notifySuccess("Handling ble oppdatert", 1000);
            }
            catch(error){
                $rootScope.notifyError("Handling ble ikke oppdatert: " + error, 6000);
                console.log("Action could not be updated" + error);
            }
        }
        else{
            try{
                action.id = ServiceFunction.generateNewId(actions);
                add(action);
                $rootScope.notifySuccess("Ny handling ble opprettet", 1000);
            }
            catch(error){
                $rootScope.notifyError("Handling kunne ikke opprettes: " + error, 6000);
                console.log("Action could not be created" + error);
            }
        }
    }

    /**
     * Function removing an action from the action list and regeneration action_dict and action_option_list
     * @param action
     */
    function removeAction(action) {
        var index = actions.indexOf(action);
        if (index > -1) {
            actions.splice(index,1);
        }
        generateActionsDict(actions);
        generateActionsOptionList(actions)
    }

    /**
     * Function deleting an action from the database
     * @param action
     */
    function deleteAction(action) {
        try{
            removeAction(action);
            $rootScope.notifySuccess("Handling ble slettet!", 1000);
        }
        catch(error){
            $rootScope.notifyError("Handling ble ikke slettet: " + error, 6000);
            console.log("Action could not be deleted" + error);
        }
    }

    function getAllAsDict(){
        return actions_dict;
    }

    function getAll(){
        return actions;
    }

    function getAllAsOptionsList(){
        return actions_option_list;
    }

    function getById(id){
        return actions_dict[id];
    }

    return {
        init: init,
        new: newAction,
        clone: clone,

        submit: submit,
        delete: deleteAction,

        getById : getById,
        getAll : getAll,
        getAllAsDict: getAllAsDict,
        getAllAsOptionsList : getAllAsOptionsList
    };
}]);