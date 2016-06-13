"use strict";

angular.module("ehelseEditor").factory("Document", ["$rootScope", "DocumentField", "Topic", "StorageHandler","ServiceFunction", function($rootScope, DocumentField, Topic, StorageHandler, ServiceFunction) {


    /**
     * Function creating a nw document
     * @returns Document
     */
    function newDocument() {
        return {
            id: null,
            createdTimestamp: null,
            editedTimestamp: null,
            title: "",
            description: "",
            statusId: 1,
            sequence: 1,
            topicId: Topic.getSelected().id,
            documentTypeId: "1",
            standardId: null,
            previousDocumentId: null,
            nextDocumentId: null,
            internalId: null,
            hisNumber: null,
            profiles: [],
            links: [],
            fields: [],
            targetGroups: []
        };
    }

    /**
     * Function creating a new profile
     * @param standardId
     * @returns Document
     */
    function newProfile(standardId) {
        return {
            id: null,
            createdTimestamp: null,
            editedTimestamp: null,
            title: "",
            description: "",
            statusId: 1,
            sequence: 1,
            topicId: Topic.getSelected().id,
            documentTypeId: "2",
            standardId: standardId,
            previousDocumentId: null,
            nextDocumentId: null,
            internalId: null,
            hisNumber: null,
            profiles: [],
            links: [],
            fields: [],
            targetGroups: []
        }
    }


    var current_document = newDocument();
    var topic_documents = [];
    var link_category_list = [];
    var documents = [];
    var documents_dict = {};
    var topics_documents_dict = {};


    init();

    function init(){
        var allDocuments = StorageHandler.getDocuments();

        documents.length = 0;

        for(var i = 0; i < allDocuments.documents.length; i++){
            var document = allDocuments.documents[i];
            document.populatedProfiles = [];
            documents.push(document);
        }

        generateDocumentDict(documents);
        generateTopicsDocumentsDict(documents);
    }

    /**
     * Function adding target groups to current document
     * @param target_groups_ids
     */
    function extendCurrentDocumentTargetGroupsByTargetGroupIds(target_groups_ids) {
        for (var i = 0; i < target_groups_ids.length; i++) {
            current_document.targetGroups.push({
                targetGroupId: target_groups_ids[i],
                description: "",
                actionId: null,
                deadline: "",
                mandatoryId: null
            });
        }
    }

    /**
     * Function adding a field to current document.
     * @param field_ids
     */
    function extendCurrentDocumentFieldsByFieldIds(field_ids) {
        for (var i = 0; i < field_ids.length; i++) {
            current_document.fields.push({fieldId: field_ids[i], value: ""});
        }
    }

    /**
     * Function removing a target group from current document.
     * @param group
     */
    function removeTargetGroup(group) {

        var index = current_document.targetGroups.indexOf(group);
        if (index > -1) {
            current_document.targetGroups.splice(index, 1);
        }
    }

    /**
     * Function removing a field from current docuent.
     * @param field
     */
    function removeField(field) {

        var index = current_document.fields.indexOf(field);
        if (index > -1) {
            current_document.fields.splice(index, 1);
        }
    }

    /**
     * Function removing link from current document.
     * @param link
     */
    function removeCurrentDocumentLink(link) {

        var index = current_document.links.indexOf(link);
        if (index > -1) {
            current_document.links.splice(index, 1);
        }
        generateCurrentDocumentLinksAsLinkCategoryList();
    }

    function initNewDocument(document){
        document.id = ServiceFunction.generateNewId(documents);
        document.populatedProfiles = [];
        document.profiles = [];
        document.createdTimestamp = ServiceFunction.getTimestamp();
        document.editedTimestamp = null;
    }

    function updateDocumentValues(document){
        document.editedTimestamp = ServiceFunction.getTimestamp();
        document.populatedProfiles = [];
    }

    /**
     * Function creating or updating current document based on if it has an id or not.
     */
    function submitCurrentDocument() {
        current_document.populatedProfiles.length = 0;
        if (current_document.id) {
            try{
                StorageHandler.addArchivedDocumentsById(current_document);
                updateDocumentValues(current_document);
                setCurrentDocument(current_document);
                updateDocumentInDocumentsList(current_document);
                $rootScope.notifySuccess("Dokumentet ble oppdatert", 1000);
            }
            catch(error){
                console.log(error);
                $rootScope.notifyError("Dokument ble ikke oppdater: " + error, 6000);
            }
        }
        else {
            try{
                //Clones current document and initialize it's values
                var new_document = clone(current_document);
                console.log(new_document);
                initNewDocument(new_document);
                console.log(new_document);

                //push profile id to standard
                if(new_document.standardId){
                    documents_dict[new_document.standardId].profiles.push({id:new_document.id});
                    console.log(documents_dict[new_document.standardId].profiles);
                }
                if(new_document.previousDocumentId){
                    documents_dict[new_document.previousDocumentId].nextDocumentId = new_document.id;
                }

                //Adds newly created document to documents list and generates dictionaries based on the new list.
                documents.push(new_document);
                generateDocumentDict(documents);
                generateTopicsDocumentsDict(documents);
                setCurrentDocument(new_document);
                $rootScope.selected_document = current_document;
                $rootScope.notifySuccess("Nytt dokument ble opprettet!", 1000);
            }
            catch(error){
                console.log(error);
                setCurrentDocument(current_document);
                $rootScope.notifyError("Nytt dokument kunne ikke opprettes: " + error, 6000);
            }
        }
    }

    /**
     * Function getting the error when updating / creating a document fails.
     * @param error
     * @returns {string}
     */
    function getErrorMessage(error){
        var error_message = "";
        var message = error.message;
        var INTERNAL_ID = "Internal id";
        var HIS = "HIS";

        if(message.indexOf(INTERNAL_ID) > -1){
            error_message = "Intern ID må være unik";
        }
        else if (message.indexOf(HIS) > -1){
            error_message = "HIS nummer må være unik";
        }
        return error_message;
    }

    /**
     * Sets next and previous documentID of the next and previous documents to null
     */
    function updatePreviousAndNextDocumentIdValues(){
        if(documents_dict[current_document.previousDocumentId]){
            documents_dict[current_document.previousDocumentId].nextDocumentId = null;

            documents_dict[current_document.previousDocumentId].populatedProfiles = [];
            updateDocumentInDocumentsList(documents_dict[current_document.previousDocumentId]);
            console.log(documents_dict[current_document.previousDocumentId]);
            console.log("Data update kjører");

            /*************************************************************************************
            $rootScope.put(
                "documents/" + current_document.previousDocumentId,
                documents_dict[current_document.previousDocumentId],
                function(data){
                    data.populatedProfiles = [];
                    updateDocumentInDocumentsList(data);
                    console.log(data);
                    console.log("Data update kjører");
                },
                function(){
                    console.log("Put went wrong: ");
                }
            )**************************************************************************************/
        }


        if(documents_dict[current_document.nextDocumentId]){
            documents_dict[current_document.nextDocumentId].previousDocumentId = null;

            documents_dict[current_document.nextDocumentId].populatedProfiles = [];
            updateDocumentInDocumentsList(documents_dict[current_document.nextDocumentId]);
            console.log(documents_dict[current_document.nextDocumentId]);
            console.log("Data update kjører");

            /***********************************************************
            $rootScope.put(
                "documents/" + current_document.nextDocumentId,
                documents_dict[current_document.nextDocumentId],
                function(data){
                    data.populatedProfiles = [];
                    updateDocumentInDocumentsList(data);
                    console.log(data);
                    console.log("Data update kjører");
                },
                function(){
                    console.log("Put went wrong: ");
                }
            )****************************************************************/
        }
    }

    /**
     * Function deleting current document.
     */
    function deleteCurrentDocument() {

        updatePreviousAndNextDocumentIdValues();

        var current_id = current_document.id;

        delete documents_dict[current_id];
        if(current_document.standardId){
            var sib = documents_dict[current_document.standardId].profiles;
            for(var i = 0; i < sib.length; i++){
                if(current_document.id == sib[i].id){
                    sib.splice(i,1);
                }
            }
        }
        StorageHandler.addArchivedDocumentsById(current_document);
        deleteCurrentDocumentFromDocumentsList();
        $rootScope.notifySuccess("Dokumentet ble slettet", 1000);
        $rootScope.changeContentView("");

        /*************************************************************
        $rootScope.delete(
            "documents/" + current_document.id,
            function(){
                delete documents_dict[current_id];
                if(current_document.standardId){
                    var sib = documents_dict[current_document.standardId].profiles;
                    for(var i = 0; i < sib.length; i++){
                        if(current_document.id == sib[i].id){
                            sib.splice(i,1);
                        }
                    }
                }
                deleteCurrentDocumentFromDocumentsList();
                $rootScope.notifySuccess("Dokumentet ble slettet", 1000);
                $rootScope.changeContentView("");
            },
            function(){
                console.log("Document could not be deleted");
                $rootScope.notifyError("Dokument kunne ikke bli slettet", 6000);
            }
        );**************************************************************/
    }


    function getCurrentDocument() {
        return current_document;
    }

    /**
     * Function returning the target groups ids of te current document target groups.
     * @param targetGroups
     * @returns {Array}
     */
    function getTargetGroupsIdsHelper(targetGroups) {
        var ids = [];
        for (var i = 0; i < targetGroups.length; i++) {
            ids.push(targetGroups[i].targetGroupId);
        }
        return ids;
    }

    /**
     * Returns ids of targe groups.
     * @returns {Array}
     */
    function getTargetGroupsIds() {
        return getTargetGroupsIdsHelper(current_document.targetGroups);
    }

    function updateDocumentInDocumentsList(document) {
        setDocument(documents_dict[document.id], document);
        generateTopicsDocumentsDict(documents);
    }

    function deleteCurrentDocumentFromDocumentsList() {
        /*if(documents_dict[current_document.nextDocumentId]){
            documents_dict[current_document.nextDocumentId].previousDocumentId = null;
        }*/
        for (var i = 0; i < documents.length; i++) {
            if (documents[i].id == current_document.id) {
                documents.splice(i,1);
                break;
            }
        }
        generateTopicsDocumentsDict(documents);
    }


    function getDocumentFieldIdsHelper(documentFields) {
        var ids = [];
        for (var i = 0; i < documentFields.length; i++) {
            ids.push(documentFields[i].fieldId);
        }
        return ids;
    }

    function getCurrentDocumentFieldIds() {
        return getDocumentFieldIdsHelper(current_document.fields);
    }

    function setDocument(a, b) {
        a.id = b.id;
        a.topicId = b.topicId;
        a.title = b.title;
        a.documentTypeId = b.documentTypeId;
        a.statusId = b.statusId;
        a.internalId = b.internalId;
        a.hisNumber = b.hisNumber;
        a.nextDocumentId = b.nextDocumentId;
        a.previousDocumentId = b.previousDocumentId;
        a.description = b.description;
        a.sequence = b.sequence;
        a.targetGroups = b.targetGroups;
        a.fields = b.fields;
        a.links = b.links;
        a.standardId = b.standardId;
        a.populatedProfiles = b.populatedProfiles || [];
    }


    function clone(document){
        var d = {};
        setDocument(d, document);
        return d;
    }

    function setCurrentDocument(document) {
        if (!document) {
            document = newDocument();
            setDocument(current_document, document);
            setCurrentDocumentFieldsByDocumentDocumentTypeId();
        }
        else {
            setDocument(current_document, document);
            setCurrentDocumentFieldsByDocumentDocumentTypeId();
        }
        generateCurrentDocumentLinksAsLinkCategoryList();

        if(document.standardId){
            getRelatedProfiles(document);
        }else{
            getProfiles(document)
        }
    }

    function getDocumentsByTopicId(id) {
        if(!Array.isArray(topics_documents_dict[id])){
            topics_documents_dict[id] = [];
        }
        return topics_documents_dict[id];
    }

    function setCurrentDocumentFieldsByDocumentDocumentTypeId() {
        current_document.fields.length = 0;
        extendCurrentDocumentFieldsByFieldIds(DocumentField.getRequiredDocumentFieldIdsByDocumentTypeId(current_document.documentTypeId))
    }

    function generateCurrentDocumentLinksAsLinkCategoryList() {

        var link_category_dict = {};
        for (var i = 0; i < current_document.links.length; i++) {
            var link = current_document.links[i];
            if (!link_category_dict[link.linkCategoryId]) {
                link_category_dict[link.linkCategoryId] = {id: link.linkCategoryId, links: []};
            }
            link_category_dict[link.linkCategoryId].links.push(link);
        }
        link_category_list.length = 0;

        for (var prop in link_category_dict) {
            // skip loop if the property is from prototype
            if (!link_category_dict.hasOwnProperty(prop)) continue;

            link_category_list.push(link_category_dict[prop]);
        }
    }

    function getCurrentDocumentLinksAsLinkCategoryList() {
        return link_category_list;
    }

    function getCurrentDocumentLinkCategoriesIds() {
        var link_category_ids = [];
        for (var i = 0; i < current_document.links.length; i++) {
            link_category_ids.push(current_document.links[i].linkCategoryId);
        }
        return link_category_ids;
    }

    function extendCurrentDocumentLinkCategoriesByLinkCategoriesIds(ids) {
        for (var i = 0; i < ids.length; i++) {
            addLinkToCurrentDocumentByLinkCategoryId(ids[i]);
        }
        generateCurrentDocumentLinksAsLinkCategoryList();
    }

    function addLinkToCurrentDocumentByLinkCategoryId(id) {
        current_document.links.push({linkCategoryId: id, text: "", url: ""});
        generateCurrentDocumentLinksAsLinkCategoryList();
    }


    function removeCurrentDocumentLinksByCategoryId(linkCategoryId) {
        var tmp_list = [];
        for (var i = 0; i < current_document.links.length; i++) {
            if (current_document.links[i].linkCategoryId != linkCategoryId) {
                tmp_list.push(current_document.links[i]);
            }
        }
        current_document.links.length = 0;
        Array.prototype.push.apply(current_document.links, tmp_list);
        generateCurrentDocumentLinksAsLinkCategoryList();
    }

    function getNewProfile(standardId) {
        return newProfile(standardId);
    }

    /******************************************************************************************
    function getAllDocuments() {
        var allDocuments = StorageHandler.getDocuments();

        documents.length = 0;

        for(var i = 0; i < allDocuments.documents.length; i++){
            var document = allDocuments.documents[i];
            document.populatedProfiles = [];
            documents.push(document);
        }

        generateDocumentDict(documents);
        generateTopicsDocumentsDict(documents);

        $rootScope.get(
            "documents/",
            function (data) {
                documents.length = 0;

                for(var i = 0; i < data.documents.length; i++){
                    var document = data.documents[i];
                    document.populatedProfiles = [];
                    documents.push(document);
                }

                generateDocumentDict(documents);
                generateTopicsDocumentsDict(documents);
            },
            function () {
                console.log("Could not load documents");
            }
        );
    } *******************************************************************************************/

    function newVersion(document){
        var new_version = clone(document);
        new_version.previousDocumentId = new_version.id;
        new_version.id = null;
        return new_version;
    }

    function generateDocumentDict(documents){
        for(var i = 0; i < documents.length; i++){
            documents_dict[documents[i].id] = documents[i];
        }
    }

    function generateTopicsDocumentsDict(documents){
        var topics = Topic.getAllAsDict();

        for(var id in topics) {
            if(Array.isArray(topics_documents_dict[id])){
                topics_documents_dict[id].length = 0;
            }
            else{
                topics_documents_dict[id] = [];
            }
        }


        var document;
        for(var i = 0; i < documents.length; i++){
            document = documents[i];
            if(!Array.isArray(topics_documents_dict[document.topicId])){
                topics_documents_dict[document.topicId] = [];
            }
            topics_documents_dict[document.topicId].push(document);
        }
    }

    function getAll(){
        return documents;
    }

    function getProfiles(document) {

        var profiles = null;
        if(documents_dict[document.id]) {
            profiles = documents_dict[document.id].profiles;
        }

        if(profiles) {
            document.populatedProfiles.length = 0;
            for (var i = 0; i < profiles.length; i++) {
                document.populatedProfiles.push(documents_dict[profiles[i].id])
            }
        }
    }

    function getRelatedProfiles(document) {

        var profiles = null;
        if(documents_dict[document.standardId]) {
            profiles = documents_dict[document.standardId].profiles;
        }

        if(profiles) {
            document.populatedProfiles.length = 0;
            for (var i = 0; i < profiles.length; i++) {
                document.populatedProfiles.push(documents_dict[profiles[i].id])
            }
        }
    }

    function getAllAsDict(){
        return documents_dict;
    }

    function getById(id){
        return documents_dict[id];
    }

    return {
        init: init,
        getCurrentDocumentTargetGroupsIds: getTargetGroupsIds,
        getCurrentDocument: getCurrentDocument,
        extendCurrentDocumentTargetGroupsByTargetGroupIds: extendCurrentDocumentTargetGroupsByTargetGroupIds,
        removeCurrentDocumentTargetGroup: removeTargetGroup,
        submitCurrentDocument: submitCurrentDocument,
        setCurrentDocument: setCurrentDocument,
        getNewProfile: getNewProfile,
        newVersion: newVersion,
        getAll: getAll,
        getAllAsDict: getAllAsDict,
        getById: getById,
        deleteCurrentDocument: deleteCurrentDocument,
        getCurrentDocumentFieldIds: getCurrentDocumentFieldIds,
        extendCurrentDocumentFieldsByFieldIds: extendCurrentDocumentFieldsByFieldIds,
        removeCurrentDocumentField: removeField,
        getDocumentsByTopicId: getDocumentsByTopicId,
        setCurrentDocumentFieldsByDocumentDocumentTypeId: setCurrentDocumentFieldsByDocumentDocumentTypeId,
        getCurrentDocumentLinksAsLinkCategoryList: getCurrentDocumentLinksAsLinkCategoryList,
        getCurrentDocumentLinkCategoriesIds: getCurrentDocumentLinkCategoriesIds,
        extendCurrentDocumentLinkCategoriesByLinkCategoriesIds: extendCurrentDocumentLinkCategoriesByLinkCategoriesIds,
        addLinkToCurrentDocumentByLinkCategoryId: addLinkToCurrentDocumentByLinkCategoryId,
        removeCurrentDocumentLink: removeCurrentDocumentLink,
        removeCurrentDocumentLinksByCategoryId: removeCurrentDocumentLinksByCategoryId
    };
}]);
