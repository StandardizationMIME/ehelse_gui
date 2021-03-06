"use strict";

angular.module("ehelseEditor").factory("Topic", ["$rootScope", "StorageHandler", "ServiceFunction", function($rootScope, StorageHandler, ServiceFunction) {

    var topics = [];
    var topics_dict = {};
    var topics_options_list = [];
    var selected_topic = {};
    var documents = [];

    init();

    function init(){
        $rootScope.max_topic_levels = 5;
        try{
            Array.prototype.push.apply(topics, StorageHandler.getTopics().topics);
            for(var i = 0; i < topics.length; i++){
                topics[i].sequence = Number(topics[i].sequence);
            }
            generateTopicDict(topics);
            generateTopicOptionsList(topics);
        }
        catch(error){
            console.log("Topics could not be loaded: " + error);
            $rootScope.notifyError("Temaer kunne ikke lastes: " + error, 6000);
        }
    }

    /**
     * Function used to clear all Topic lists and dicts.
     */
    function clear(){
        topics.length = 0;
        topics_dict = {};
        topics_options_list.length = 0;
        selected_topic = {};
        documents.length = 0;
    }

    function setDocuments(input_documents) {
        documents = input_documents;
    }

    /**
     * Function generation topic option list with the topics id as key.
     *
     * To be used were only the topics id is available to get other information about the topic
     * @param topics
     */
    function generateTopicDict(topics){
        for(var i = 0; i < topics.length; i++){
            topics_dict[topics[i].id] = topics[i];
            $.extend(topics_dict, generateTopicDict(topics[i].children));
        }
    }

    /**
     * Function used to call the recursive function generateTopicOptionsListHelper with the inital values.
     *
     * The topic options list is a bit different from the other option lists as they have the path of the
     * folder not only the name for the folder. This is achieved with recursion.
     * @param topics
     */
    function generateTopicOptionsList(topics){
        topics_options_list.length = 0;
        Array.prototype.push.apply(topics_options_list, generateTopicOptionsListHelper(-1, "", topics));
    }

    /**
     * Function used to generate topic option list.
     *
     * Recursive.
     * @param level, 0-4 used to prevent the user from creating too many levels of topics
     * @param parent, the parent folder path
     * @param topics, subtopics of the topic
     * @returns {Array}
     */
    function generateTopicOptionsListHelper(level, parent, topics){
        var paths = [];
        topics = ServiceFunction.sortArrayOnSequence(topics);    // Sort topics on sequence
        for (var i = 0; i < topics.length; i++) {
            paths.push({
                id: topics[i].id,
                path: parent + "/" + topics[i].title,
                level: level
            });
            Array.prototype.push.apply(paths, generateTopicOptionsListHelper(level+1, parent + "/" + topics[i].title, topics[i].children))
        }
        return (paths);
    }

    /**
     * Function adding newly created topic to the correct list of topics based on parent id.
     *
     * Regenerates topic_dict and topic_options_list
     * @param topic
     */
    function addTopic(topic){
        if(topic.parentId){
            topics_dict[topic.parentId].children.push(topic);
        }
        else{
            topics.push(topic);
        }
        generateTopicDict(topics);
        generateTopicOptionsList(topics);
    }

    /**
     * Function updating the content of an existing topic.
     *
     * Moves the topic to the correct topic list if the parent_id is changed
     * @param topic
     */
    function updateTopic(topic){
        var old_topic = topics_dict[topic.id];
        var children = old_topic.children;
        if(old_topic.parentId != topic.parentId){
            removeById(old_topic.id);
            topic.sequence = Number(topic.sequence);
            setTopic(topics_dict[topic.id], topic);
            addTopic(old_topic);
        }
        else{
            topic.sequence = Number(topic.sequence);
            setTopic(topics_dict[topic.id], topic);
        }
        topics_dict[topic.id].children = children;
    }

    function initNewTopicValues(topic){
        topic.id = ServiceFunction.generateNewIdFromDict(topics_dict);
        topic.children = [];
    }

    function toggleTopicSelection(topic){
        var parent = getById(topic.parentId);
        while(parent){

            $("#topic" + parent.id).collapse('show');

            var topicIcon = $("#folder" + parent.id);
            topicIcon.removeClass("fa-folder");
            topicIcon.addClass("fa-folder-open");

            parent = getById(parent.parentId);
        }
    }

    /**
     * function creating or updating a topic based on if it has an id
     * @param topic
     */
    function submit(topic){

        if(topic.parentId == "null" || topic.parentId == ""){
            topic.parentId = null;
        }

        if(topic.id){
            try{
                updateTopic(topic);
                generateTopicDict(topics);
                generateTopicOptionsList(topics);
                toggleTopicSelection(selected_topic);
                $rootScope.notifySuccess("Tema ble oppdatert",1000);
            }
            catch(error){
                console.log("Topic could not be updated: " + error);
                $rootScope.notifyError("Tema ble ikke oppdatert: " + error, 6000);
            }
        }
        else{
            try{
                var new_topic = clone(topic);
                initNewTopicValues(new_topic);
                addTopic(new_topic);
                toggleTopicSelection(new_topic);
                $rootScope.notifySuccess("Nytt tema ble opprettet!", 1000);
                $rootScope.getDocuments(new_topic.id);
            }
            catch(error){
                console.log("Topic could not be created: " + error);
                $rootScope.notifyError("Tema ble ikke opprettet: " + error, 6000);
            }
        }
    }

    /**
     * Function deleting a topic from the list it's in.
     *
     * Used when moving or deleting a topic
     * @param id
     */
    function removeById(id){
        var element = topics_dict[id];
        if(topics_dict[element.parentId]){
            var siblings = topics_dict[element.parentId].children;
            removeElementFromArray(element, siblings);
        }
        else{
            removeElementFromArray(element, topics);
        }

    }

    /**
     * Helper method used to remove elements from an array.
     *
     * Updates topic_options_list and topics_dict
     * @param element
     * @param array
     */
    function removeElementFromArray(element, array){
        var index = array.indexOf(element);
        if (index > -1) {
            array.splice(index, 1);
        }
        generateTopicOptionsList(topics);
        generateTopicDict(topics);
    }

    /**
     * Function returning new Topic
     * @returns Topic
     */
    function newTopic(){
        return {
            id: null,
            title: "",
            description: "",
            sequence: null,
            parentId: null,
            children: []
        }
    }

    /**
     * Function used to update a topic a with the values of topic b.
     *
     * This is done to take advantage of angular listening to changes in objects.
     * @param a
     * @param b
     */
    function setTopic(a,b){
        a.id = b.id;
        a.title = b.title;
        a.description = b.description;
        a.sequence = b.sequence;
        a.parentId = b.parentId;
        a.children = b.children;
    }

    /**
     * Function cloning an topic.
     *
     * This is done to not make changes to the original object before it is submited.
     * @param topic
     * @returns {{}}
     */
    function clone(topic){
        var t = {};
        setTopic(t, topic);
        return t;
    }

    /**
     * Function deleting a topic from the server
     * @param topic
     */
    function deleteTopic(topic){
        deleteById(topic.id);
    }

    /**
     * Function deleting a topic from the server by id
     * @param id
     */
    function deleteById(id){
        if(id){
            if (topics_dict[id].children.length || hasDocuments(id)) {
                console.log("Error: could not delete topic because it is not empty");
                $rootScope.notifyError("Error: Kan ikke slette temaer som ikke er tomme!", 6000);
            } else {
                try {
                    removeById(id);
                    $rootScope.notifySuccess("Topic ble fjernet", 1000);
                    $rootScope.changeContentView("");
                }
                catch (error) {
                    console.log("Topic could not be deleted: " + error);
                    $rootScope.notifyError("Tema ble ikke slettes: " + error, 6000);
                }
            }
        }
    }

    /**
     * Returns if a topic has any documents
     * @param topic_id
     * @returns {boolean}
     */
    function hasDocuments(topic_id) {
        for (var i = 0; i < documents.length; i++) {
            var document = documents[i];
            if (document["topicId"] == topic_id) {
                return true;
            }
        }
        return false;
    }

    function getAll(){
        return topics;
    }

    function getAllAsDict(){
        return topics_dict;
    }

    function getAllAsOptionsList(){
        return topics_options_list;
    }
    function getById(id){
        return topics_dict[id];
    }
    function setSelectedById(id){
        setTopic(selected_topic, topics_dict[id]);
    }
    function getSelected(){
        return selected_topic;
    }

    /**
     * Returns the level in the topic list of a topic
     * @param topic
     * @returns {number}
     */
    function getTopicLevel(topic){
        if(topic.parentId){
            var count = 0;
            while (topic.parentId != null){
                topic = topics_dict[topic.parentId];
                count ++
            }
            return count+1;
        }
    }

    /**
     * Returns top level parent of topic by id
     *
     * If t1.parentId = null, t2.parentId = 1, t3.parentId = 2,
     *  getTopLevelTopic(3) gives 1.
     * @param id
     * @returns {*}
     */
    function getTopLevelParentId(id) {
        var topic = topics_dict[id];
        if (topic.parentId) {
            return getTopLevelParentId(topic.parentId);
        } else {
            return id;
        }
    }

    /**
     * Checks if a topic is another topics child by id
     *
     *  If t1.parentId = null, t2.parentId = 1, t3.parentId = 2,
     *  isChildrenOfTopic(1,2) gives false,
     *  isChildrenOfTopic(3,1) gives true.
     * @param child_id
     * @param parent_id
     * @returns {*}
     */
    function isChildrenOfTopic(child_id, parent_id) {
        var child = topics_dict[child_id];
        if (child.parentId) {
            if (child.parentId == parent_id) {
                return true;
            } else {
                return isChildrenOfTopic(child.parentId, parent_id);
            }
        } else {
            return false;
        }
    }


    return {
        clear: clear,
        init: init,
        setDocuments: setDocuments,
        new: newTopic,
        clone: clone,
        submit: submit,
        delete: deleteTopic,
        deleteById: deleteById,
        getById: getById,
        getAll: getAll,
        getAllAsDict: getAllAsDict,
        getAllAsOptionsList: getAllAsOptionsList,
        setSelectedById: setSelectedById,
        getSelected: getSelected,
        getTopicLevel: getTopicLevel,
        getTopLevelParentId: getTopLevelParentId,
        isChildrenOfTopic: isChildrenOfTopic
    };
}]);