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


    function extendDocumentTargetGroupsByTargetGroupIds(target_groups_ids){
        for(var i = 0; i < target_groups_ids.length; i++){
            document.targetGroups.push({
                targetGroupId:target_groups_ids[i],
                description:"",
                actionId: null,
                deadline:"",
                mandatoryId: null
            });
        }
    }


    function extendDocumentFieldsByFieldIds(field_ids){
        for(var i = 0; i < field_ids.length; i++){
            document.fields.push({fieldId:field_ids[i], value:""});
        }
        console.log(document.fields);
    }


    function removeTargetGroup(group){

        var index = document.targetGroups.indexOf(group);
        if (index > -1) {
            document.targetGroups.splice(index, 1);
        }
    }

    function removeField(field){

        var index = document.fields.indexOf(field);
        if (index > -1) {
            document.fields.splice(index, 1);
        }
    }

    function submit(){
        if(document.id){

            $rootScope.put(
                'documents/' + document.id,
                document,
                function (data) {
                    $rootScope.notifySuccess("Dokumentet ble oppdatert",6000);
                }
                ,
                function () {
                    console.log("New document could not be created");
                    $rootScope.notifyError("Standard kunne ikke opprettes",6000);
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
                    $rootScope.notifySuccess("Ny standard ble opprettet",6000);
                }
                ,
                function () {
                    console.log("New document could not be created");
                    $rootScope.notifyError("Standard kunne ikke opprettes",6000);
                }
            );
        }
    }


    function getDocument(){
        return document;
    }


    var target_groups_ids = [];
    function getTargetGroupsIdsHelper(targetGroups){
        var ids = [];
        for( var i = 0; i < targetGroups.length; i++){
            ids.push(targetGroups[i].targetGroupId);
        }
        return ids;
    }

    function getTargetGroupsIds(){
        target_groups_ids = getTargetGroupsIdsHelper(document.targetGroups);
        return target_groups_ids;
    }



    var document_field_ids = [];

    function getDocumentFieldIdsHelper(documentFields){
        var ids = [];
        for( var i = 0; i < documentFields.length; i++){
            ids.push(documentFields[i].fieldId);
        }
        return ids;
    }

    function getDocumentFieldIds(){
        document_field_ids = getDocumentFieldIdsHelper(document.fields);
        return document_field_ids;
    }


    function setDocument(d){
        if(!d) {
            d = newDocument();
        }
        document = d;
        target_groups_ids = getTargetGroupsIds(document.targetGroups);
    }

    return {
        getTargetGroupsIds : getTargetGroupsIds,
        getDocument : getDocument,
        extendDocumentTargetGroupsByTargetGroupIds : extendDocumentTargetGroupsByTargetGroupIds,
        removeTargetGroup :removeTargetGroup,
        submit: submit,
        setDocument : setDocument,
        getDocumentFieldIds : getDocumentFieldIds,
        extendDocumentFieldsByFieldIds: extendDocumentFieldsByFieldIds,
        removeField: removeField
    };
}]);
