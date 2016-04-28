'use strict';

angular.module('ehelseEditor').factory('Action', ['$rootScope', function($rootScope) {

    var actions = [];
    var actions_option_list = [];

    function getActions(){
        $rootScope.get(
            'actions/',
            function ( data ){
                Array.prototype.push.apply(actions, data.actions);
                Array.prototype.push.apply(actions_option_list, generateactionsOptionList(actions));
            },
            function (data) {
                console.log("No document types found");
            }
        )
    }

    getActions();

    function generateactionsOptionList(actions){
        var tuples = [];

        for (var i = 0; i < actions.length; i++) {
            var mandator = actions[i];
            tuples.push({
                value: mandator.id,
                name: mandator.name,
                description: mandator.description
            })
        }
        return tuples;
    }

    function createAction(action, success, error) {
        
        $rootScope.post(
            'actions/',
            action,
            function ( data ){
                actions.push(data);
                generateactionsOptionList(actions);
                success(data);
            }, 
            error
        );
    }

    function editAction(action, success, error){
        
    }
    
    return {
        actions : actions,
        actions_option_list : actions_option_list
    };
}]);