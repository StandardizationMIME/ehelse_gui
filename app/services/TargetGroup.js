'use strict';

angular.module('ehelseEditor').factory('TargetGroup', ['$rootScope', function($rootScope) {

    var target_groups = [];
    var target_groups_dict = {};
    var target_groups_options_list= [];

    $rootScope.get(
        'target-groups/',
        function ( data ){
            Array.prototype.push.apply(target_groups, data.targetGroups);
            generateTargetGroupDict(target_groups);
            generateTargetGroupOptionsList(target_groups);

        },
        function (data) {
            console.log("No document types found");
        }
    );


    function generateTargetGroupDict(target_groups){
        for(var i = 0; i < target_groups.length; i++){
            target_groups_dict[target_groups[i].id] = target_groups[i];
        }
    }

    function generateTargetGroupOptionsList(target_groups){
        target_groups_options_list.length = 0;
        for(var i = 0; i < target_groups.length; i++){
            target_groups_options_list.push({
                id: target_groups[i].id,
                name: target_groups[i].name
            });
        }
    }

    function addTargetGroupToTargetGroupDict(group) {
        target_groups_dict[group.id] = group;
    }

    function addTargetGroupToTargetGroupOptionList(group) {
        target_groups_options_list.push({
            id: group.id,
            name: group.name
        });
    }

    function addTargetGroup(group){
        target_groups.push(group);
        addTargetGroupToTargetGroupDict(group);
        addTargetGroupToTargetGroupOptionList(group);
    }


    function submit(group){

        if(group.parentId == "null" || group.parentId == ""){
            group.parentId = null;
        }

        if(group.id){
            $rootScope.put('target-groups/'+group.id,
                group,
                function(data){
                    setTargetGroup(target_groups_dict[data.id], data);
                    generateTargetGroupOptionsList(target_groups);
                    $rootScope.notifySuccess('Målgruppe ble oppdatert',6000);

                },
                function(data){
                    $rootScope.notifyError('Målgruppe ble ikke oppdatert.',6000);
                });
        }
        else{
            $rootScope.post(
                'target-groups/',
                group,
                function(data){
                    $rootScope.notifySuccess('Ny målgruppe ble opprettet.',6000);
                    addTargetGroup(data);
                },function(){
                    $rootScope.notifyError('Målgruppe ble ikke opprettet.',6000);
                }
            );
        }
    }

    function removeById(id){
        var index = target_groups.indexOf(target_groups_dict[id]);
        if (index > -1) {
            target_groups.splice(index, 1);
        }
    }


    function deleteById(id){
        if(id){
            $rootScope.delete('target-groups/'+id,
                function(data){
                    removeById(id);
                    generateTargetGroupOptionsList(target_groups);
                    generateTargetGroupDict(target_groups);
                    $rootScope.notifySuccess('Målgruppe ble fjernet',6000);

                },
                function(data){
                    $rootScope.notifyError('Målgruppe ble ikke fjernet.',6000);
                });
        }
    }

    function newTargetGroup(){
        return {
            id:null,
            name: "",
            description: "",
            parentId:null,
            abbreviation: ""
        };
    }

    function setTargetGroup(a, b) {
        a.id = b.id;
        a.name = b.name;
        a.description = b.description;
        a.parentId = b.parentId;
        a.abbreviation = b.abbreviation;
    }

    function clone(group){
        var g = {};
        setTargetGroup(g, group);
        return g;
    }

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