'use strict';

angular.module('ehelseEditor').factory('Status',['$rootScope',function($rootScope){

    var status = [];
    var status_dict = {};
    var status_option_list = [];

    $rootScope. get(
        'status/',
        function (data){
            Array.prototype.push.apply(status, data.status);
            generateStatusOptionList(status);
            generateStatusDict(status);
        },
        function (data){

        }
    );


    function generateStatusDict(status){
        for(var i = 0; i < status.length; i++){
            status_dict[status[i].id] = status[i];
        }
    }

    function newStatus(){
        return {
            id: null,
            name: "",
            description: ""
        }
    }

    function clone(s){
        var cs = {};
        set(cs, s);
        return cs;
    }

    function set(a,b){
        a.id = b.id;
        a.name = b.name;
        a.description = b.description;
    }

    function add(s){
        status.push(s);
        generateStatusDict(status);
        generateStatusOptionList(status);
    }

    function generateStatusOptionList(status){
        status_option_list.length = 0;

        for (var i = 0; i < status.length; i++){
            status_option_list.push({
                value: status[i].id,
                name: status[i].name
            })
        }
    }

    function submit(status){
        if(status.id){
            $rootScope.put('status/'+status.id,
                status,
                function(data){
                    set(status_dict[data.id], data);
                    generateStatusDict(status);
                    generateStatusOptionList(status);
                    $rootScope.notifySuccess('Status ble oppdatert',6000);

                },
                function(data){
                    $rootScope.notifyError('Status ble ikke oppdatert.',6000);
                });
        }
        else{
            $rootScope.post(
                'status/',
                status,
                function(data){
                    $rootScope.notifySuccess('Ny status ble opprettet.',6000);
                    add(data);
                },function(){
                    $rootScope.notifyError('Status ble ikke opprettet.',6000);
                }
            );
        }
    }

    function removeStatus(s){
        var index = status.indexOf(s);
        if (index > -1) {
            status.splice(index,1)
        }
    }

    function deleteStatus(status) {
        $rootScope.delete(
            'status/' + status.id,
            function (){
                removeStatus(status);
                generateStatusOptionList(status);
                generateStatusDict(status);
                $rootScope.notifySuccess("Status ble slettet!", 5000);
            },
            function (){
                $rootScope.notifyError("Kunne ikke slette", 5000);
            }
        );
    }

    function getById(id){
        return status_dict[id];
    }

    function getAll(){
        return status;
    }

    function getAllAsOptionsList(){
        return status_option_list;
    }

    function getAllAsDict(){
        return status_dict;
    }

    return {
        new: newStatus,
        clone: clone,

        getById: getById,
        getAll: getAll,
        getAllAsDict: getAllAsDict,
        getAllAsOptionsList: getAllAsOptionsList,

        delete: deleteStatus,
        submit: submit
    }
}]);