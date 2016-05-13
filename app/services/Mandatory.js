"use strict";

angular.module("ehelseEditor").factory("Mandatory", ["$rootScope", function($rootScope) {

    var mandatory = [];
    var mandatory_dict = {};
    var mandatory_option_list = [];

    $rootScope.get(
        "mandatory/",
        function ( data ){
            Array.prototype.push.apply(mandatory, data.mandatory);
            generateMandatoryDict(mandatory);
            generateMandatoryOptionList(mandatory);
        },
        function (data) {
            console.log("No document types found");
        }
    );

    function newMandatory(){
        return {
            id: null,
            name: "",
            description: ""
        }
    }

    function add(man){
        mandatory.push(man);
        generateMandatoryDict(mandatory);
        generateMandatoryOptionList(mandatory);
    }

    function set(a,b){
        a.id = b.id;
        a.name = b.name;
        a.description = b.description;
    }

    function clone(mandatory){
        var m = {};
        set(m, mandatory);
        return m;
    }

    function generateMandatoryOptionList(mandatory){
        mandatory_option_list.length = 0;
        for (var i = 0; i < mandatory.length; i++) {
            mandatory_option_list.push({
                name: mandatory[i].name,
                value: mandatory[i].id
            });
        }
    }

    function generateMandatoryDict(mandatory){
        for(var i = 0; i < mandatory.length; i++){
            mandatory_dict[mandatory[i].id] = mandatory[i];
        }
    }

    function removeMandatory(m) {
        var index = mandatory.indexOf(m);
        if (index > -1) {
            mandatory.splice(index,1);
        }
        generateMandatoryDict(mandatory);
        generateMandatoryOptionList(mandatory);
    }

    function deleteMandatory(mandatory) {
        $rootScope.delete(
            "mandatory/" + mandatory.id,
            function () {
                removeMandatory(mandatory);
                generateMandatoryOptionList(mandatory);
                $rootScope.notifySuccess("Obligatoriskhet ble slettet!", 3000);
            },
            function () {
                $rootScope.notifyError("Kunne ikke slette obligatoriskhet", 6000);
            }
        );
    }


    function submit(man){
        if(man.id){
            $rootScope.put("mandatory/"+man.id,
                man,
                function(data){
                    set(mandatory_dict[data.id], data);
                    generateMandatoryDict(mandatory);
                    generateMandatoryOptionList(mandatory);
                    $rootScope.notifySuccess("Obligatoriskhet ble oppdatert",3000);

                },
                function(data){
                    $rootScope.notifyError("Obligatoriskhet ble ikke oppdatert.",6000);
                });
        }
        else{
            $rootScope.post(
                "mandatory/",
                man,
                function(data){
                    $rootScope.notifySuccess("Ny obligatoriskhet ble opprettet.",3000);
                    add(data);
                },function(){
                    $rootScope.notifyError("Obligatoriskhet ble ikke opprettet.",6000);
                }
            );
        }
    }

    function getAll(){
        return mandatory;
    }

    function getAllAsDict(){
        return mandatory_dict;
    }

    function getAllAsOptionsList(){
        return mandatory_option_list;
    }

    function getById(id) {
        return mandatory_dict[id];
    }

    return {
        new: newMandatory,
        clone: clone,
        submit: submit,
        delete: deleteMandatory,

        getById: getById,
        getAll: getAll,
        getAllAsDict:getAllAsDict,
        getAllAsOptionsList:getAllAsOptionsList
    };
}]);