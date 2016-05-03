'use strict';

angular.module('ehelseEditor').factory('Action', ['$rootScope', function($rootScope) {

    var actions = [];
    var actions_option_list = [];

    function getActions(){
        $rootScope.get(
            'actions/',
            function ( data ){
                Array.prototype.push.apply(actions, data.actions);
                Array.prototype.push.apply(actions_option_list, generateActionsOptionList(actions));
            },
            function (data) {
                console.log("No document types found");
            }
        )
    }

    getActions();

    function generateActionsOptionList(actions){
        var tuples = [];

        for (var i = 0; i < actions.length; i++) {
            var mandator = actions[i];
            tuples.push({
                id: mandator.id,
                name: mandator.name,
                description: mandator.description
            })
        }
        return tuples;
    }
    
    function editAction(action, success, error) {
        $rootScope.put(
            'actions/' + action.id,
            action,
            function (data) {
                for (var i = 0; i < actions_option_list.length; i++) {
                    if (data.id == actions_option_list[i].id){
                        var action = actions_option_list[i];
                    }
                }
                action.name = data.name;
                action.description = data.description;
                success(data);
            },
            error
        );
    }
    
    function createAction(action, success, error) {
        var mandatoryString = "";
        if (action.description) {
            mandatoryString = action.description;
        }
        var myAction = {
            "id": "",
            "name": action.name,
            "description": mandatoryString
        };

        $rootScope.post(
            'actions/',
            myAction,
            function (data) {
                actions_option_list.push(data);
                generateActionsOptionList(actions_option_list);
                success(data);
            },
            error
        );
    }

    function removeAction(action) {
        var index = actions_option_list.indexOf(action);
        if (index > -1) {
            actions_option_list.splice(index,1);
        }
    }

    function deleteAction(action) {
        $rootScope.delete(
            'actions/' + action.id,
            function () {
                removeAction(action);
                generateActionsOptionList(action);
                console.log("Successfully deleted action");
                $rootScope.notifySuccess("Handling ble slettet!", 5000);

            },
            function(){
                $rootScope.notifyError("Kunne ikke slette", 5000);
            }

        );
    }

    function getById(id, success, error) {
        $rootScope.get(
            'actions/' + id,
            function (data) {
                success(data);
            },
            error
        );
    }

    return {
        editAction: editAction, 
        getById: getById,
        createAction: createAction,
        deleteAction: deleteAction,
        actions : actions,
        actions_option_list : actions_option_list
    };
}]);