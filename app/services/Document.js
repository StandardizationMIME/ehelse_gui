'use strict';

angular.module('ehelseEditor').factory('Document', ['$rootScope', function($rootScope) {


    function newDocument(){
        return {
            "topicId" : $rootScope.selectedTopicId,
            "title" : "",
            "documentTypeId":null,
            "statusId": null,
            "nextDocumentId": null,
            "previousDocumentId": null,
            "description" : "",
            "sequence": 0,
            "comment": "",
            "targetGroups": [],
            "fields": [],
            "links": []
        }
    }


    var document = newDocument();

    var target_groups_ids = [];

    function extendDocumentTargetGroupsByTargetGroupIds(target_groups_ids){
        for(var i = 0; i < target_groups_ids.length; i++){
            document.targetGroups.push({targetGroupId:target_groups_ids[i]});
        }
    }

    function getTargetGroupIds(targetGroups){
        var ids = [];
        for( var i = 0; i < targetGroups.length; i++){
            ids.push(targetGroups[i].targetGroupId);
        }
        return ids;
    }

    function removeTargetGroup(group){

        var index = document.targetGroups.indexOf(group);
        if (index > -1) {
            document.targetGroups.splice(index, 1);
        }

        var index = target_groups_ids.indexOf(group.targetGroupId);
        if (index > -1) {
            target_groups_ids.splice(index, 1);
        }
    }

    function submit(){
        if(document.id){

            $rootScope.put(
                'documents/' + document.id,
                document,
                function (data) {
                    $rootScope.addDocuments(data);
                    $rootScope.notifySuccess("Dokumentet ble oppdatert");
                }
                ,
                function () {
                    console.log("New document could not be created");
                    $rootScope.notifyError("Standard kunne ikke opprettes");
                }
            );
        }
        else {
            $rootScope.post(
                'documents/',
                document,
                function (data) {
                    console.log("New document created");
                    $rootScope.addDocuments(data);
                    $rootScope.notifySuccess("Ny standard ble opprettet");
                }
                ,
                function () {
                    console.log("New document could not be created");
                    $rootScope.notifyError("Standard kunne ikke opprettes");
                }
            );
        }
    }

    function setDocument(d){
        if(!d) {
            d = newDocument();
        }
        document = d;
        target_groups_ids = getTargetGroupIds(document.targetGroups);
    }

    function getDocument(){
        return document;
    }

    function getTargetGroupsIds(){
        target_groups_ids = getTargetGroupIds(document.targetGroups);
        return target_groups_ids;
    }

    return {
        getTargetGroupsIds : getTargetGroupsIds,
        getDocument : getDocument,
        extendDocumentTargetGroupsByTargetGroupIds : extendDocumentTargetGroupsByTargetGroupIds,
        removeTargetGroup :removeTargetGroup,
        submit: submit,
        setDocument : setDocument
    };
}]);
