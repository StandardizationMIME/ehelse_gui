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
            console.log(mandator);
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
                var action = actions_option_list[data.id];
                action.name = data.name;
                action.description = data.description;
                success(data);
            },
            error
        );
        console.log("editAction: " + action);
    }
    
    function createAction(action, success, error) {
        var mandatoryString = " ";
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

    function deleteAction(action, success, error) {
        console.log("DELTED ACTION: " + action);
        $rootScope.delete(
            'actions/' + action.id,
            function () {
                removeAction(action);
                generateActionsOptionList(action);
                success();
            },
            error
        );
    }

    function getById(id, success, error) {
        console.log(id);
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