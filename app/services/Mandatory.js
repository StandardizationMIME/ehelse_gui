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
                id: mandator.id,
                name: mandator.name,
                description: mandator.description
            })
        }
        return tuples;
    }

    function removeMandatory(mandatory) {
        var index = mandatory_option_list.indexOf(mandatory);
        if (index > -1) {
            mandatory_option_list.splice(index,1);
        }
    }
    
    function deleteMandatory(mandatory) {
        $rootScope.delete(
            'mandatory/' + mandatory.id,
            function () {
                removeMandatory(mandatory);
                generateMandatoryOptionList(mandatory);
                $rootScope.notifySuccess("Mandatory ble slettet!", 5000);
            },
            function () {
                $rootScope.notifyError("Kunne ikke slette", 5000);
            }
        );
    }
    
    function createMandatory(mandatory, success, error) {
        var tempString = "";
        if (mandatory.description) {
            tempString = mandatory.description;
        }

        var myMandatory = {
            "id": "",
            "name": mandatory.name,
            "description": tempString
        };

        $rootScope.post(
            'mandatory/',
            myMandatory,
            function (data) {
                mandatory_option_list.push(data);
                generateMandatoryOptionList(mandatory_option_list);
                success(data);
            },
            error
        );
    }

    function editMandatory(mandatory, success, error) {
        $rootScope.put(
            'mandatory/' + mandatory.id,
            mandatory,
            function (data) {
                for (var i = 0; i < mandatory_option_list.length; i++) {
                    if (data.id == mandatory_option_list[i].id){
                        var mandatory = mandatory_option_list[i];
                    }
                }
                mandatory.name = data.name;
                mandatory.description = data.description;
                success(data);
            },
            error
        )
    }
    
    function getById(id, success, error) {
        $rootScope.get(
            'mandatory/' + id,
            function (data) {
                success(data);
            },
            error
        );
    }
    
    return {
        getById: getById,
        editMandatory: editMandatory,
        createMandatory: createMandatory,
        deleteMandatory: deleteMandatory,
        mandatory : mandatory,
        mandatory_option_list : mandatory_option_list
    };
}]);