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
            populatedProfiles: [],
            links: [],
            fields: [],
            targetGroups: []
        }
    }


    var current_document = newDocument();
    var link_category_list = [];
    var documents = [];
    var documents_dict = {};
    var topics_documents_dict = {};


    init();

    function init(){
        try{
            var allDocuments = StorageHandler.getDocuments();
            documents.length = 0;

            for(var i = 0; i < allDocuments.documents.length; i++){
                var document = allDocuments.documents[i];
                document.populatedProfiles = [];
                documents.push(document);
            }

            Topic.setDocuments(documents);  // Adds reference to the document list int Topic
            generateDocumentDict(documents);
            generateTopicsDocumentsDict(documents);
        }
        catch(error){
            $rootScope.notifyError("Dokumenter kunne ikke lastes inn: " + error, 6000);
            console.log("Documents could not be loaded " + error);
        }
    }

    /**
     * Function adding target groups to current document
     * @param target_groups_ids
     */
    function extendCurrentDocumentTargetGroupsByTargetGroupIds(target_groups_ids) {
        if(target_groups_ids){
            for (var i = 0; i < target_groups_ids.length; i++) {
                current_document.targetGroups.push({
                    targetGroupId: target_groups_ids[i],
                    description: "",
                    actionId: null,
                    deadline: "",
                    mandatoryId: null
                });
            }
        }else{
            console.log("Input = " + target_groups_ids + " and is invalid");        }
    }

    /**
     * Function adding a field to current document.
     * @param field_ids
     */
    function extendCurrentDocumentFieldsByFieldIds(field_ids) {
        if(field_ids){
            for (var i = 0; i < field_ids.length; i++) {
                current_document.fields.push({fieldId: field_ids[i], value: ""});
            }
        }else{
            console.log("Input = " + fields_ids + " and is invalid");        }
    }

    /**
     * Function removing a target group from current document.
     * @param group
     */
    function removeTargetGroup(group) {
        if(group){
            var index = current_document.targetGroups.indexOf(group);
            if (index > -1) {
                current_document.targetGroups.splice(index, 1);
            }
        }else{
            $rootScope.notifyError("Målgruppe kunne ikke fjernes", 6000);
            console.log("Input = " + group + " and is invalid");        }
    }

    /**
     * Function removing a field from current document.
     * @param field
     */
    function removeField(field) {
        if(field){
            var index = current_document.fields.indexOf(field);
            if (index > -1) {
                current_document.fields.splice(index, 1);
            }
        }else{
            $rootScope.notifyError("Felt kunne ikke fjernes", 6000);
            console.log("Input = " + field + " and is invalid");
        }
    }

    /**
     * Function removing link from current document.
     * @param link
     */
    function removeCurrentDocumentLink(link) {
        if(link){
            var index = current_document.links.indexOf(link);
            if (index > -1) {
                current_document.links.splice(index, 1);
            }
            generateCurrentDocumentLinksAsLinkCategoryList();
        }else{
            $rootScope.notifyError("Link kunne ikke fjernes", 6000);
            console.log("Input = " + link + " and is invalid");
        }
    }

    function initNewDocument(document){
        if(document){
            document.id = generateNewDocumentId(documents);
            document.populatedProfiles = [];
            document.profiles = [];
            document.createdTimestamp = ServiceFunction.getTimestamp();
            document.editedTimestamp = ServiceFunction.getTimestamp();
        }else{
            console.log("Input = " + document + " and is invalid");
        }
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
                var archived_document = clone(documents_dict[current_document.id]);
                StorageHandler.addArchivedDocumentsById(archived_document);
                updateDocumentValues(current_document);
                setCurrentDocument(current_document);
                updateDocumentInDocumentsList(current_document);
                $rootScope.notifySuccess("Dokumentet ble oppdatert", 1000);
            }
            catch(error){
                console.log(error);
                $rootScope.notifyError("Dokument ble ikke oppdatert: " + error, 6000);
            }
        }
        else {
            try{
                //Clones current document and initialize it's values
                var new_document = clone(current_document);
                initNewDocument(new_document);

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
    function nullifyPreviousAndNextDocumentIdValues(){
        if(documents_dict[current_document.previousDocumentId] && documents_dict[current_document.nextDocumentId]){
            documents_dict[current_document.previousDocumentId].nextDocumentId = documents_dict[current_document.nextDocumentId].id;
            documents_dict[current_document.nextDocumentId].previousDocumentId = documents_dict[current_document.previousDocumentId].id;
            documents_dict[current_document.previousDocumentId].populatedProfiles = [];
            documents_dict[current_document.nextDocumentId].populatedProfiles = [];
        }else{
            if(documents_dict[current_document.previousDocumentId]){
                documents_dict[current_document.previousDocumentId].nextDocumentId = null;
                documents_dict[current_document.previousDocumentId].populatedProfiles = [];
                updateDocumentInDocumentsList(documents_dict[current_document.previousDocumentId]);
            }
            if(documents_dict[current_document.nextDocumentId]){
                documents_dict[current_document.nextDocumentId].previousDocumentId = null;
                documents_dict[current_document.nextDocumentId].populatedProfiles = [];
                updateDocumentInDocumentsList(documents_dict[current_document.nextDocumentId]);
            }
        }
    }

    /**
     * Function deleting current document.
     */
    function deleteCurrentDocument() {
        try{
            var archived_document = clone(documents_dict[current_document.id]);
            StorageHandler.addArchivedDocumentsById(archived_document);

            nullifyPreviousAndNextDocumentIdValues();
            var current_id = current_document.id;

            /* DENNE LINJA ER JEG USIKKER PÅ, må sees over senere. */
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
        }
        catch(error){
            $rootScope.notifyError("Dokumentet kunne ikke slettes: " + error, 6000);
            console.log("Dokumentet kunne ikke slettes: " + error);
        }
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
        if(targetGroups){
            for (var i = 0; i < targetGroups.length; i++) {
                ids.push(targetGroups[i].targetGroupId);
            }
        }else{
            console.log("Input = " + targetGroups + ", and is invalid. An empty list is returned");
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
        if(document){
            setDocument(documents_dict[document.id], document);
            generateTopicsDocumentsDict(documents);
        }else{
            console.log("Input = " + document + ", and is invalid.");
        }
    }

    function deleteCurrentDocumentFromDocumentsList() {
        if(documents){
            for (var i = 0; i < documents.length; i++) {
                if (documents[i].id == current_document.id) {
                    documents.splice(i,1);
                    break;
                }
            }
            generateTopicsDocumentsDict(documents);
        }
        else{
            console.log("documents is empty, current document can't be deleted");
        }
    }


    function getDocumentFieldIdsHelper(documentFields) {
        var ids = [];
        if(documentFields){
            for (var i = 0; i < documentFields.length; i++) {
                ids.push(documentFields[i].fieldId);
            }
        }else{
            console.log("Input = " + documentFields + ", and is invalid. An empty list is returned");
        }
        return ids;
    }

    function getCurrentDocumentFieldIds() {
        return getDocumentFieldIdsHelper(current_document.fields);
    }

    function setDocument(a, b) {
        if(a && b){
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
            a.editedTimestamp = b.editedTimestamp;
            a.createdTimestamp = b.createdTimestamp;
        }else{
            console.log("Invalid input");
            console.log("Input a = " + a);
            console.log("Input b = " + b);
        }
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
        //current_document.fields.length = 0;
        extendCurrentDocumentFieldsByFieldIds(DocumentField.getRequiredDocumentFieldIdsByDocumentTypeId(current_document.documentTypeId))
    }

    function generateCurrentDocumentLinksAsLinkCategoryList() {

        var link_category_dict = {};
        if(current_document.links){
            for (var i = 0; i < current_document.links.length; i++) {
                var link = current_document.links[i];
                if (!link_category_dict[link.linkCategoryId]) {
                    link_category_dict[link.linkCategoryId] = {id: link.linkCategoryId, links: []};
                }
                link_category_dict[link.linkCategoryId].links.push(link);
            }
        }else{
            console.log("Current document has no links");
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
        if(current_document.links){
            for (var i = 0; i < current_document.links.length; i++) {
                link_category_ids.push(current_document.links[i].linkCategoryId);
            }
        }else{
            console.log("Current document has no links, an empty list is returned");
        }
        return link_category_ids;
    }

    function extendCurrentDocumentLinkCategoriesByLinkCategoriesIds(ids) {
        if(ids){
            for (var i = 0; i < ids.length; i++) {
                addLinkToCurrentDocumentByLinkCategoryId(ids[i]);
            }
        }else{
            console.log("Input = " + ids + ", and is invalid.");
        }
        generateCurrentDocumentLinksAsLinkCategoryList();
    }

    function addLinkToCurrentDocumentByLinkCategoryId(id) {
        current_document.links.push({linkCategoryId: id, text: "", url: ""});
        generateCurrentDocumentLinksAsLinkCategoryList();
    }


    function removeCurrentDocumentLinksByCategoryId(linkCategoryId) {
        var tmp_list = [];
        if(current_document.links){
            for (var i = 0; i < current_document.links.length; i++) {
                if (current_document.links[i].linkCategoryId != linkCategoryId) {
                    tmp_list.push(current_document.links[i]);
                }
            }
        }else{
            console.log("Current document has no links.")
        }
        current_document.links.length = 0;
        Array.prototype.push.apply(current_document.links, tmp_list);
        generateCurrentDocumentLinksAsLinkCategoryList();
    }

    function getNewProfile(standardId) {
        return newProfile(standardId);
    }

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

    /**
     * Returns new unique document id
     *
     * Checks all document currently in the system, and all archived document
     *  find max id. Increments max by 1.
     * @param documents
     * @returns {number}
     */
    function generateNewDocumentId(documents) {
        var max = -Infinity;
        var archived_documents = StorageHandler.getArchivedDocuments();
        for (var i = 0; i < documents.length; i++) {
            var id = parseInt(documents[i]["id"]);
            if (id > max)
                max = id;
        }
        for (var id in archived_documents) {
            id = parseInt(id);
            if (id > max)
                max = id;
        }
        return (max + 1);
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
