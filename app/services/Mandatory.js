'use strict';

angular.module('ehelseEditor').factory('Mandatory', ['$rootScope', function($rootScope) {

    var mandatory = [];
    var mandatory_option_list = [];

    function getMandatory(){
        $rootScope.get(
            'mandatory/',
            function ( data ){
                Array.prototype.push.apply(mandatory, data.mandatory);
                Array.prototype.push.apply(mandatory_option_list, generateMandatoryOptionList(mandatory));
            },
            function (data) {
                console.log("No document types found");
            }
        )
    }

    getMandatory();

    function generateMandatoryOptionList(mandatory){
        var tuples = [];

        for (var i = 0; i < mandatory.length; i++) {
            var mandator = mandatory[i];
            tuples.push({
                value: mandator.id,
                name: mandator.name
            })
        }
        return tuples;
    }

    return {
        mandatory : mandatory,
        mandatory_option_list : mandatory_option_list
    };
}]);