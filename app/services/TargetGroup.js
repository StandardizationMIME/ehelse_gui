'use strict';

angular.module('ehelseEditor').factory('TargetGroup', ['$rootScope', function($rootScope) {

    var target_groups = [];
    var target_groups_dict = {};

    function getTargetGroups(){
        $rootScope.get(
            'target-groups/',
            function ( data ){
                Array.prototype.push.apply(target_groups, data.targetGroups);
                generateTargetGroupDict(target_groups);
                console.log(target_groups_dict[1].name);

            },
            function (data) {
                console.log("No document types found");
            }
        )
    }

    function generateTargetGroupDict(target_groups){
        for(var i = 0; i < target_groups.length; i++){
            target_groups_dict[target_groups[i].id] = target_groups[i];
        }
    }

    getTargetGroups();




    return {
        target_groups : target_groups,
        target_groups_dict : target_groups_dict
    };
}]);