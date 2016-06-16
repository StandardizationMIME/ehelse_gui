"use strict";

angular.module("ehelseEditor").factory("TargetGroup", ["$rootScope", "StorageHandler", "ServiceFunction", function($rootScope, StorageHandler, ServiceFunction) {

    var target_groups = [];
    var target_groups_dict = {};
    var target_groups_options_list= [];

    init();

    function init(){
        try{
            Array.prototype.push.apply(target_groups, StorageHandler.getTargetGroups().targetGroups);
            generateTargetGroupDict(target_groups);
            generateTargetGroupOptionsList(target_groups);
        }
        catch(error){
            console.log("Target groups could not be loaded: " + error);
            $rootScope.notifyError("Målgrupper kunne ikke lastes: " + error, 6000);
        }
    }

    /**
     * Function generating target_group_dict
     *
     * Used where only target_group_id is available to acces all of the target_groups properties
     * @param target_groups
     */
    function generateTargetGroupDict(target_groups){
        for(var i = 0; i < target_groups.length; i++){
            target_groups_dict[target_groups[i].id] = target_groups[i];
        }
    }

    /**
     * Function generating target group options list
     *
     * Used to generate html options lists
     * @param target_groups
     */
    function generateTargetGroupOptionsList(target_groups){
        target_groups_options_list.length = 0;
        for(var i = 0; i < target_groups.length; i++){
            target_groups_options_list.push({
                id: target_groups[i].id,
                name: target_groups[i].name
            });
        }
    }

    /**
     * Function adding target_grout to target_group_dict
     *
     * Used when only adding one target group. Optimization of running generateTargetGroupDict
     * @param group
     */
    function addTargetGroupToTargetGroupDict(group) {
        target_groups_dict[group.id] = group;
    }

    /**
     * Function adding target_group to target_group_options_dict
     *
     * Used when only adding one target group. Optimization of running generateTargetGroupOptionsList
     * @param group
     */
    function addTargetGroupToTargetGroupOptionList(group) {
        target_groups_options_list.push({
            id: group.id,
            name: group.name
        });
    }

    /**
     * Function adding a target group to the list of target groups and updating the dict and options list.
     * @param group
     */
    function addTargetGroup(group) {
        target_groups.push(group);
        addTargetGroupToTargetGroupDict(group);
        addTargetGroupToTargetGroupOptionList(group);
    }

    function initNewTargetGroupValues(targetGroup){
        targetGroup.id = ServiceFunction.generateNewId(target_groups);
        targetGroup.isArchived = 0;
    }

    /**
     * Function creating or updating a target group based on if it got an id or not.
     * @param group
     */
    function submit(group){
        if(group.parentId == "null" || group.parentId == ""){
            group.parentId = null;
        }
        if(group.id){
            try{
                setTargetGroup(target_groups_dict[group.id], group);
                generateTargetGroupDict(target_groups);
                $rootScope.notifySuccess("Mulgruppe ble oppdatert", 1000);
            }
            catch(error){
                console.log("Target group could not be updated: " + error);
                $rootScope.notifyError("Målgruppe ble ikke oppdatert: " + error, 6000);
            }
        }
        else{
            try{
                initNewTargetGroupValues(group);
                addTargetGroup(group);
                $rootScope.notifySuccess("Ny målgruppe ble opprettet", 1000);
            }
            catch(error){
                console.log("Target group could not be created: " + error);
                $rootScope.notifyError("Målgruppe ble ikke opprettet: " + error, 6000);
            }
        }
    }

    /**
     * Function removing a target group from the list of target groups.
     * @param id
     */
    function archiveById(id){
        target_groups[target_groups.indexOf(target_groups_dict[id])].isArchived = 1;
    }

    /**
     * Function deleting a target group from the server.
     * @param id
     */
    function deleteById(id){
        if(id){
            try{
                archiveById(id);
                generateTargetGroupOptionsList(target_groups);
                generateTargetGroupDict(target_groups);
                $rootScope.notifySuccess("Målgruppe ble fjernet",1000);
            }
            catch(error){
                console.log("Target group could not be deleted: " + error);
                $rootScope.notifyError("Målgruppe ble ikke slettet: " + error, 6000);
            }
        }
    }

    /**
     * Function creating a new target group.
     * @returns TargetGroup
     */
    function newTargetGroup(){
        return {
            id:null,
            name: "",
            description: "",
            parentId:null,
            abbreviation: "",
            isArchived: 0
        };
    }

    /**
     * Function replacing the content of target group a with the content of target group b.
     *
     * This is done to take advantage that angular updates the views when objects change.
     * @param a
     * @param b
     */
    function setTargetGroup(a, b) {
        a.id = b.id;
        a.name = b.name;
        a.description = b.description;
        a.parentId = b.parentId;
        a.abbreviation = b.abbreviation;
        a.isArchived = b.isArchived;
    }

    /**
     * Function cloning a target group.
     *
     * Used to prevent the original object from being updated before they should.
     * @param group
     * @returns TargetGroup
     */
    function clone(group){
        var g = {};
        setTargetGroup(g, group);
        return g;
    }

    /**
     * Fucnction deleting a TargetGroup by the target_group object.
     * @param group
     */
    function deleteTargetGroup(group){
        deleteById(group.id)
    }



    function getAll(){
        return target_groups;
    }

    function getById(id){
        return target_groups_dict[id];
    }

    function getAllAsDict(){
        return target_groups_dict;
    }

    function getAllAsOptionsList(){
        return target_groups_options_list;
    }

    return {
        init: init,
        new: newTargetGroup,
        getAll : getAll,
        getById : getById,
        getAllAsDict : getAllAsDict,
        getAllAsOptionsList: getAllAsOptionsList,
        clone: clone,
        submit: submit,
        delete: deleteTargetGroup,
        deleteById: deleteById
    };
}]);