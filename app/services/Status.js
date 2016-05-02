'use strict';

angular.module('ehelseEditor').factory('Status',['$rootScope',function($rootScope){

    var status = [];
    var status_option_list = [];

    function getStatus(){
        $rootScope. get(
            'status/',
            function (data){
                Array.prototype.push.apply(status, data.status);
                Array.prototype.push.apply(status_option_list, generateStatusOptionList(status));
            },
            function (data){

            }
        )
    }

    getStatus();

    function generateStatusOptionList(status){
        var tuples = [];

        for (var i = 0; i < status.length; i++){
            var mandator = status[i];
            tuples.push({
                id: mandator.id,
                name: mandator.name,
                description: mandator.description
            })
        }
        return tuples;
    }

    function createStatus(status, success, error) {
        var tempString = "";
        if (status.description) {
            tempString = status.description;
        }

        var myStatus = {
            "id": "",
            "name": status.name,
            "description": tempString
        }

        $rootScope.post(
            'status/',
            myStatus,
            function (data) {
                status_option_list.push(data);
                generateStatusOptionList(status_option_list);
                success(data);
            },
            error
        );

    }

    function editStatus(status, success, error) {
        $rootScope.put(
            'status/' + status.id,
            status,
            function (data) {
                for (var i = 0; i < status_option_list.length; i++) {
                    if (data.id == status_option_list[i].id) {
                        var status = status_option_list[i];
                    }
                }
                status.name = data.name;
                status.description = data.description;
                success(data);
            },
            error
        );
    }

    function removeStatus(status){
        var index = status_option_list.indexOf(status);
        if (index > -1) {
            status_option_list.splice(index,1)
        }
    }

    function deleteStatus(status) {
        $rootScope.delete(
            'status/' + status.id,
            function (){
                removeStatus(status);
                generateStatusOptionList(status);
                $rootScope.notifySuccess("Status ble slettet!", 5000);
            },
            function (){
                $rootScope.notifyError("Kunne ikke slette", 5000);
            }
        );
    }

    function getById(id, success, error){
        $rootScope.get(
            'status/' + id,
            function (data){
                success(data);
            },
            error
        );
    }

    return {
        getById: getById,
        deleteStatus: deleteStatus,
        createStatus: createStatus,
        editStatus: editStatus,
        status: status,
        status_option_list: status_option_list
    }
}]);