"use strict";

angular.module("ehelseEditor").factory("TargetGroup", ["$rootScope", function($rootScope) {

    var target_groups = [];
    var target_groups_dict = {};
    var target_groups_options_list= [];

    var getTargetGroups =
    {
        targetGroups:
            [
                {
                    abbreviation: "AMB",
                    description: "asd",
                    id: 10,
                    name: "Ambulanse",
                    parentId: null
                },
                {
                    abbreviation: "SHT",
                    description: "asd",
                    id: 11,
                    name: "Spesialisthelsetjenesten",
                    parentId: null
                }
            ]
    };

    Array.prototype.push.apply(target_groups, getTargetGroups.targetGroups);
    generateTargetGroupDict(target_groups);
    generateTargetGroupOptionsList(target_groups);

    /**
     * Function retrieving target groups from the server
     */
    /*****************************************************************************************
     $rootScope.get(
        "target-groups/",
        function ( data ){
            Array.prototype.push.apply(target_groups, data.targetGroups);
            generateTargetGroupDict(target_groups);
            generateTargetGroupOptionsList(target_groups);

        },
        function (data) {
            console.log("No document types found");
        }
    );******************************************************************************************/

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
    function addTargetGroup(group){
        target_groups.push(group);
        addTargetGroupToTargetGroupDict(group);
        addTargetGroupToTargetGroupOptionList(group);
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
            setTargetGroup(target_groups_dict[group.id], group);
            generateTargetGroupDict(target_groups);
            $rootScope.notifySuccess("Mulgruppe ble oppdatert", 1000);

            /******************************************************************************************
            $rootScope.put("target-groups/"+group.id,
                group,
                function(data){
                    setTargetGroup(target_groups_dict[data.id], data);
                    generateTargetGroupOptionsList(target_groups);
                    $rootScope.notifySuccess("Målgruppe ble oppdatert",1000);

                },
                function(data){
                    $rootScope.notifyError("Målgruppe ble ikke oppdatert.",6000);
                }
            );******************************************************************************************/
        }
        else{
            addTargetGroup(group);
            $rootScope.notifySuccess("Ny målgruppe ble opprettet", 1000);

            /******************************************************************************************
            $rootScope.post(
                "target-groups/",
                group,
                function(data){
                    $rootScope.notifySuccess("Ny målgruppe ble opprettet.",1000);
                    addTargetGroup(data);
                },function(){
                    $rootScope.notifyError("Målgruppe ble ikke opprettet.",6000);
                }
            );******************************************************************************************/
        }
    }

    /**
     * Function removing a target group from the list of target groups.
     * @param id
     */
    function removeById(id){
        var index = target_groups.indexOf(target_groups_dict[id]);
        if (index > -1) {
            target_groups.splice(index, 1);
        }
    }

    /**
     * Function deleting a target group from the server.
     * @param id
     */
    function deleteById(id){
        if(id){
            removeById(id);
            generateTargetGroupOptionsList(target_groups);
            generateTargetGroupDict(target_groups);
            $rootScope.notifySuccess("Målgruppe ble fjernet",1000);

            /*************************************************************************************************
            $rootScope.delete("target-groups/"+id,
                function(data){
                    removeById(id);
                    generateTargetGroupOptionsList(target_groups);
                    generateTargetGroupDict(target_groups);
                    $rootScope.notifySuccess("Målgruppe ble fjernet",1000);

                },
                function(data){
                    $rootScope.notifyError("Målgruppe ble ikke fjernet.",6000);
                }
            );**************************************************************************************************/
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
            abbreviation: ""
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