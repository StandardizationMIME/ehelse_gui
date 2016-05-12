'use strict';

angular.module('ehelseEditor').factory('Action', ['$rootScope', function($rootScope) {

    var actions = [];
    var actions_dict = {};
    var actions_option_list = [];

    function newAction(){
        return {
            id: null,
            name: "",
            description: ""
        };
    }

    function set(a, b){
        a.id = b.id;
        a.name = b.name;
        a.description = b.description;
    }

    function add(action){
        actions.push(action);
        generateActionsDict(actions);
        generateActionsOptionList(actions);
    }

    function clone(action){
        var a = {};
        set(a, action);
        return a;
    }

    $rootScope.get(
        'actions/',
        function ( data ){
            Array.prototype.push.apply(actions, data.actions);
            generateActionsOptionList(actions);
            generateActionsDict(actions);
        },
        function (data) {
            console.log("No document types found");
        }
    );

    function generateActionsOptionList(actions){
        actions_option_list.length = 0;
        for (var i = 0; i < actions.length; i++) {
            actions_option_list.push({
                name: actions[i].name,
                value: actions[i].id
            });
        }
    }

    function generateActionsDict(actions){
        for(var i = 0; i < actions.length; i++){
            actions_dict[actions[i].id] = actions[i];
        }
    }

    function submit(action){
        if(action.id){
            $rootScope.put('actions/'+action.id,
                action,
                function(data){
                    set(actions_dict[data.id], data);
                    generateActionsDict(actions);
                    generateActionsOptionList(actions);
                    $rootScope.notifySuccess('Handling ble oppdatert',3000);

                },
                function(data){
                    $rootScope.notifyError('Handling ble ikke oppdatert.',3000);
                });
        }
        else{
            $rootScope.post(
                'actions/',
                action,
                function(data){
                    $rootScope.notifySuccess('Ny handling ble opprettet.',3000);
                    add(data);
                },function(){
                    $rootScope.notifyError('Handling ble ikke opprettet.',3000);
                }
            );
        }
    }


    function removeAction(action) {
        var index = actions.indexOf(action);
        if (index > -1) {
            actions.splice(index,1);
        }
        generateActionsDict(actions);
        generateActionsOptionList(actions)
    }

    function deleteAction(action) {
        $rootScope.delete(
            'actions/' + action.id,
            function () {
                removeAction(action);
                $rootScope.notifySuccess("Handling ble slettet!", 3000);

            },
            function(){
                $rootScope.notifyError("Kunne ikke slette", 3000);
            }

        );
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