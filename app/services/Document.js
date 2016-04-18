'use strict';

angular.module('ehelseEditor').factory('Document', ['$rootScope', function($rootScope) {


    function newDocument(){
        return {
            "id": null,
            "topicId" : $rootScope.selectedTopicId,
            "title" : "",
            "documentTypeId":"1",
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


    var current_document = newDocument();
    var documents = [];


    function extendCurrentDocumentTargetGroupsByTargetGroupIds(target_groups_ids){
        for(var i = 0; i < target_groups_ids.length; i++){
            current_document.targetGroups.push({
                targetGroupId:target_groups_ids[i],
                description:"",
                actionId: null,
                deadline:"",
                mandatoryId: null
            });
        }
    }


    function extendCurrentDocumentFieldsByFieldIds(field_ids){
        for(var i = 0; i < field_ids.length; i++){
            current_document.fields.push({fieldId:field_ids[i], value:""});
        }
        console.log(current_document.fields);
    }


    function removeTargetGroup(group){

        var index = current_document.targetGroups.indexOf(group);
        if (index > -1) {
            current_document.targetGroups.splice(index, 1);
        }
    }

    function removeField(field){

        var index = current_document.fields.indexOf(field);
        if (index > -1) {
            current_document.fields.splice(index, 1);
        }
    }

    function submitCurrentDocument(){
        if(current_document.id){

            $rootScope.put(
                'documents/' + current_document.id,
                current_document,
                function (data) {
                    updateDocumentInDocumentsList(data);
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
                current_document,
                function (data) {
                    setCurrentDocument(data);
                    documents.push(data);
                    $rootScope.notifySuccess("Ny standard ble opprettet",6000);
                }
                ,
                function () {
                    $rootScope.notifyError("Standard kunne ikke opprettes",6000);
                }
            );
        }
    }


    function getCurrentDocument(){
        return current_document;
    }


    function getTargetGroupsIdsHelper(targetGroups){
        var ids = [];
        for( var i = 0; i < targetGroups.length; i++){
            ids.push(targetGroups[i].targetGroupId);
        }
        return ids;
    }

    function getTargetGroupsIds(){
        return getTargetGroupsIdsHelper(current_document.targetGroups);
    }

    function updateDocumentInDocumentsList(document){
        for(var i = 0; i < documents.length; i++){
            if(documents[i].id == document.id){
                setDocument(documents[i], document);
                break;
            }
        }
    }


    function getDocumentFieldIdsHelper(documentFields){
        var ids = [];
        for( var i = 0; i < documentFields.length; i++){
            ids.push(documentFields[i].fieldId);
        }
        return ids;
    }

    function getCurrentDocumentFieldIds(){
        return  getDocumentFieldIdsHelper(current_document.fields);
    }


    function setDocument(a, b){
        a.id = b.id;
        a.topicId = b.topicId;
        a.title = b.title;
        a.documentTypeId = b.documentTypeId;
        a.statusId = b.statusId;
        a.nextDocumentId = b.nextDocumentId;
        a.previousDocumentId = b.previousDocumentId;
        a.description = b.description;
        a.sequence = b.sequence;
        a.comment = b.comment;
        a.targetGroups = b.targetGroups;
        a.fields = b.fields;
        a.links = b.links;
    }

    function setCurrentDocument(document){
        if(!document) {
            document = newDocument();
        }
        setDocument(current_document, document)
    }

    function getDocumentsByTopicId(id){
        documents = [];
        $rootScope.get('topics/' + id , function(data){
            Array.prototype.push.apply(documents, data.documents);

        }, function(){});
        return documents;
    }

    return {
        getCurrentDocumentTargetGroupsIds : getTargetGroupsIds,
        getCurrentDocument : getCurrentDocument,
        extendCurrentDocumentTargetGroupsByTargetGroupIds : extendCurrentDocumentTargetGroupsByTargetGroupIds,
        removeCurrentDocumentTargetGroup :removeTargetGroup,
        submitCurrentDocument: submitCurrentDocument,
        setCurrentDocument : setCurrentDocument,
        getCurrentDocumentFieldIds : getCurrentDocumentFieldIds,
        extendCurrentDocumentFieldsByFieldIds: extendCurrentDocumentFieldsByFieldIds,
        removeCurrentDocumentField: removeField,
        getDocumentsByTopicId :getDocumentsByTopicId
    };
}]);
