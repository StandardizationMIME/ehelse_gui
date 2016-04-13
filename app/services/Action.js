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
                name: mandator.name
            })
        }
        return tuples;
    }

    return {
        actions : actions,
        actions_option_list : actions_option_list
    };
}]);