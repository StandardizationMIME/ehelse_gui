'use strict';

angular.module('ehelseEditor').factory('Document', ['$rootScope', 'DocumentField', 'Topic', function($rootScope, DocumentField, Topic) {


    function newDocument() {
        return {
            id: null,
            timestamp: null,
            title: "",
            description: "",
            statusId: 1,
            sequence: 0,
            topicId: Topic.getSelected().id,
            comment: "",
            documentTypeId: "1",
            standardId: null,
            previousDocumentId: null,
            internalId: null,
            hisNumber: null,
            profiles: [],
            links: [],
            fields: [],
            targetGroups: [],
            populatedProfiles: []
        };
    }

    function newProfile(standardId) {
        return {
            id: null,
            timestamp: null,
            title: "",
            description: "",
            statusId: 1,
            sequence: 0,
            topicId: Topic.getSelected().id,
            comment: "",
            documentTypeId: "2",
            standardId: standardId,
            previousDocumentId: null,
            internalId: null,
            hisNumber: null,
            profiles: [],
            links: [],
            fields: [],
            targetGroups: [],
            populatedProfiles: []
        }
    }


    var current_document = newDocument();
    var topic_documents = [];
    var link_category_list = [];
    var documents = [];
    var documents_dict = {};
    var topics_documents_dict = {};

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


    function extendCurrentDocumentFieldsByFieldIds(field_ids) {
        for (var i = 0; i < field_ids.length; i++) {
            current_document.fields.push({fieldId: field_ids[i], value: ""});
        }
    }


    function removeTargetGroup(group) {

        var index = current_document.targetGroups.indexOf(group);
        if (index > -1) {
            current_document.targetGroups.splice(index, 1);
        }
    }

    function removeField(field) {

        var index = current_document.fields.indexOf(field);
        if (index > -1) {
            current_document.fields.splice(index, 1);
        }
    }

    function removeCurrentDocumentLink(link) {

        var index = current_document.links.indexOf(link);
        if (index > -1) {
            current_document.links.splice(index, 1);
        }
        generateCurrentDocumentLinksAsLinkCategoryList();
    }


    function submitCurrentDocument() {
        current_document.populatedProfiles.length = 0;
        if (current_document.id) {

            $rootScope.put(
                'documents/' + current_document.id,
                current_document,
                function (data) {
                    data.populatedProfiles = [];
                    setCurrentDocument(current_document);
                    updateDocumentInDocumentsList(data);
                    $rootScope.notifySuccess("Dokumentet ble oppdatert", 3000);
                }
                ,
                function (data) {
                    var error = getErrorMessage(data);
                    setCurrentDocument(current_document);
                    $rootScope.notifyError("Dokumentet kunne ikke opprettes: " + error, 6000);
                }
            );
        }
        else {
            $rootScope.post(
                'documents/',
                current_document,
                function (data) {
                    data.populatedProfiles = [];
                    //push profile id to standard
                    if(data.standardId){
                        documents_dict[data.standardId].profiles.push({id:data.id});
                        console.log(documents_dict[data.standardId].profiles);
                    }
                    if( data.previousDocumentId){
                        documents_dict[data.previousDocumentId].nextDocumentId = data.id;
                    }
                    documents.push(data);
                    generateDocumentDict(documents);
                    generateTopicsDocumentsDict(documents);
                    setCurrentDocument(data);
                    $rootScope.notifySuccess("Ny standard ble opprettet", 3000);
                    $rootScope.buttonState = 'editDocument';
                }
                ,
                function (data) {
                    var error = getErrorMessage(data);
                    setCurrentDocument(current_document);
                    $rootScope.notifyError("Dokumentet kunne ikke opprettes: " + error, 6000);
                }
            );
        }
    }

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

    function deleteCurrentDocument() {
        $rootScope.delete(
            'documents/' + current_document.id,
            function(){
                deleteCurrentDocumentFromDocumentsList();
                $rootScope.notifySuccess("Dokumentet ble slettet", 3000);
                $rootScope.changeContentView('');
            },
            function(){
                console.log("Document could not be deleted");
                $rootScope.notifyError("Dokument kunne ikke bli slettet", 6000);
            }
        )
    }


    function getCurrentDocument() {
        return current_document;
    }


    function getTargetGroupsIdsHelper(targetGroups) {
        var ids = [];
        for (var i = 0; i < targetGroups.length; i++) {
            ids.push(targetGroups[i].targetGroupId);
        }
        return ids;
    }

    function getTargetGroupsIds() {
        return getTargetGroupsIdsHelper(current_document.targetGroups);
    }

    function updateDocumentInDocumentsList(document) {
        setDocument(documents_dict[document.id], document);
        generateTopicsDocumentsDict(documents);
    }

    function deleteCurrentDocumentFromDocumentsList() {
        if(documents_dict[current_document.nextDocumentId]){
            documents_dict[current_document.nextDocumentId].previousDocumentId = null;
        }
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
        a.comment = b.comment;
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
        }
        generateCurrentDocumentLinksAsLinkCategoryList();

        if(document.standardId){
            getRelatedProfiles(document);
        }else{
            getProfiles(document)
        }
    }

    function getDocumentsByTopicId(id) {
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

    function getAllDocuments() {
        $rootScope.get(
            'documents/',
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
            if(!topics_documents_dict[document.topicId]){
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

    getAllDocuments();

    function getAllAsDict(){
        return documents_dict;
    }

    function getById(id){
        return documents_dict[id];
    }

    return {
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
