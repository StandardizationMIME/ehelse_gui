"use strict";

angular.module("ehelseEditor").factory("Topic", ["$rootScope", function($rootScope) {

    var topics = [];
    var topics_dict = {};
    var topics_options_list = [];
    var selected_topic = {};

    var getTopics =
    {
        topics:
            [
                {
                    children: [],
                    comment: null,
                    description: null,
                    documents: [],
                    id: 161,
                    parentId: null,
                    sequence: 1,
                    timestamp: "2016-05-19 03:55:34",
                    title: "I. Informasjonssikkerhet"
                },
                {
                    children: [],
                    comment: null,
                    description: null,
                    documents: [],
                    id: 162,
                    parentId: null,
                    sequence: 3,
                    timestamp: "2016-05-19 03:55:57",
                    title: "III. Informasjonsinnhold og strukturert føring av journal"
                },
                {
                    children: [
                        {
                            children: [],
                            comment: null,
                            description: null,
                            documents: [],
                            id: 219,
                            parentId: 163,
                            sequence: 1,
                            timestamp: "2016-05-20 04:41:33",
                            title: "E-resept"
                        }
                    ],
                    comment: null,
                    description: null,
                    documents: [],
                    id: 163,
                    parentId: null,
                    sequence: 4,
                    timestamp: "2016-05-19 03:56:07",
                    title: "IV. Elektronisk samhandling"
                },
                {
                    children: [
                        {
                            children: [],
                            comment: null,
                            description: null,
                            documents: [],
                            id: 218,
                            parentId: 216,
                            sequence: 1,
                            timestamp: "2016-05-19 06:42:17",
                            title: "Test undertema"
                        }
                    ],
                    comment: null,
                    description: null,
                    documents: [],
                    id: 216,
                    parentId: null,
                    sequence: 6,
                    timestamp: "2016-05-19 06:41:51",
                    title: "VI. TESTING"
                },
                {
                    children: [
                        {
                            children: [],
                            comment: null,
                            description: null,
                            documents: [],
                            id: 221,
                            parentId: 220,
                            sequence: 1,
                            timestamp: "2016-05-20 05:17:43",
                            title: "Kodeverk"
                        }
                    ],
                    comment: null,
                    description: null,
                    documents: [],
                    id: 220,
                    parentId: null,
                    sequence: 1,
                    timestamp: "2016-05-20 05:17:05",
                    title: "II. Kodeverk, terminologier"
                },
                {
                    children: [],
                    comment: null,
                    description: null,
                    documents: [],
                    id: 222,
                    parentId: null,
                    sequence: 1,
                    timestamp: "2016-05-23 16:52:40",
                    title: "title2"
                },
                {
                    children: [],
                    comment: null,
                    description: null,
                    documents: [],
                    id: 223,
                    parentId: null,
                    sequence: 1,
                    timestamp: "2016-05-23 16:45:56",
                    title: "title"
                },
                {
                    children: [],
                    comment: null,
                    description: null,
                    documents: [],
                    id: 224,
                    parentId: null,
                    sequence: 1,
                    timestamp: "2016-05-23 16:47:48",
                    title: "title"
                },
                {
                    children: [],
                    comment: null,
                    description: null,
                    documents: [],
                    id: 225,
                    parentId: null,
                    sequence: 1,
                    timestamp: "2016-05-23 16:51:10",
                    title: "title"
                },
                {
                    children: [],
                    comment: null,
                    description: null,
                    documents: [],
                    id: 226,
                    parentId: null,
                    sequence: 1,
                    timestamp: "2016-05-23 16:51:48",
                    title: "title"
                },
                {
                    children: [],
                    comment: null,
                    description: null,
                    documents: [],
                    id: 227,
                    parentId: null,
                    sequence: 1,
                    timestamp: "2016-05-23 16:52:03",
                    title: "title"
                },
                {
                    children: [],
                    comment: null,
                    description: null,
                    documents: [],
                    id: 228,
                    parentId: null,
                    sequence: 1,
                    timestamp: "2016-05-23 16:52:40",
                    title: "title"
                }
            ]
    };

    Array.prototype.push.apply(topics, getTopics.topics);
    generateTopicDict(topics);
    generateTopicOptionsList(topics);

    /*********************************************************************************************************************
     * function retrieving topics from the server
     */
    //$rootScope.get(
    //    "topics/",
    //    function ( data ){
    //        Array.prototype.push.apply(topics, data.topics);
    //        generateTopicDict(topics);
    //        generateTopicOptionsList(topics);
    //
    //    },
    //    function (data) {
    //        console.log("No document types found");
    //    }
    //);*********************************************************************************************************************

    /**
     * Function generation topic option list with the topics id as key.
     *
     * To be used were only the topics id is available to get other information about the topic
     * @param topics
     */
    function generateTopicDict(topics){
        for(var i = 0; i < topics.length; i++){
            topics_dict[topics[i].id] = topics[i];
            $.extend(topics_dict,
                generateTopicDict(topics[i].children));
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
        Array.prototype.push.apply(topics_options_list, generateTopicOptionsListHelper(0, "", topics));
    }

    /**
     * Function used to generate topic option list.
     *
     * Recursive.
     * @param level, 0-3 used to prevent the user from creating too many levels of topics
     * @param parent, the parent folder path
     * @param topics, subtopics of the topic
     * @returns {Array}
     */
    function generateTopicOptionsListHelper(level, parent, topics){
        var paths = [];
        for (var i = 0; i < topics.length; i++) {
            paths.push({
                id: topics[i].id,
                path: parent + "/" + topics[i].title,
                level: level
            });
            Array.prototype.push.apply(paths, generateTopicOptionsListHelper(level+1, parent + "/" + topics[i].title, topics[i].children))
        }
        return paths;
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
     * @param data
     */
    function updateTopic(data){
        var old_topic = topics_dict[data.id];
        var children = old_topic.children;
        if(old_topic.parentId != data.parentId){
            removeById(old_topic.id);
            setTopic(topics_dict[data.id], data);
            addTopic(old_topic);
        }
        else{
            setTopic(topics_dict[data.id], data);
        }
        topics_dict[data.id].children = children;
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

            updateTopic(topic);
            generateTopicOptionsList(topics);
            $rootScope.notifySuccess("Tema ble oppdatert",1000);

            //********************************************************************************
            //$rootScope.put("topics/"+topic.id,
            //    topic,
            //    function(data){
            //        updateTopic(data);
            //        generateTopicOptionsList(topics);
            //        $rootScope.notifySuccess("Tema ble oppdatert",1000);
            //
            //    },
            //    function(data){
            //        $rootScope.notifyError("Tema ble ikke oppdatert.",6000);
            //    });
            //********************************************************************************
        }
        else{

            addTopic(topic);
            $rootScope.notifySuccess("Nytt tema ble opprettet!", 1000);
            console.log("Tema ble opprettet");

            //********************************************************************************
            //$rootScope.post(
            //    "topics/",
            //    topic,
            //    function(data){
            //        $rootScope.notifySuccess("Ny tema ble opprettet.",1000);
            //        addTopic(data);
            //    },function(){
            //        $rootScope.notifyError("Tema ble ikke opprettet.",6000);
            //    }
            //);
            //********************************************************************************
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
            timestamp: null,
            title: "",
            description: "",
            sequence: null,
            parentId: null,
            comment: "",
            children: [],
            documents: []
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
        a.timestamp = b.timestamp;
        a.title = b.title;
        a.description = b.description;
        a.sequence = b.sequence;
        a.parentId = b.parentId;
        a.comment = b.comment;
        a.children = b.children;
        a.documents = b.documents;
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

            removeById(id);
            $rootScope.notifySuccess("Topic ble fjernet",1000);
            $rootScope.changeContentView("");

            //************************************************************************************
            //$rootScope.delete("topics/"+id,
            //    function(data){
            //        removeById(id);
            //        $rootScope.notifySuccess("Topic ble fjernet",1000);
            //        $rootScope.changeContentView("");
            //
            //    },
            //    function(data){
            //        if(data.message == "Element can't be deleted."){
            //            $rootScope.notifyError("Temaer med tilknyttetde undertemaer og/eller dokumenter kan ikke slettes!", 6000);
            //        }else{
            //            $rootScope.notifyError("Uventet feil: Topic ble ikke fjernet.",4000);
            //        }
            //    }
            //);
            //************************************************************************************
        }
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

    return {
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
        getSelected: getSelected
    };
}]);