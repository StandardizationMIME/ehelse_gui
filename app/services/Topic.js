'use strict';

angular.module('ehelseEditor').factory('Topic', ['$rootScope', function($rootScope) {

    var topics = [];
    var topics_dict = {};
    var topics_options_list = [];
    var selected_topic = {};

    $rootScope.get(
        'topics/',
        function ( data ){
            Array.prototype.push.apply(topics, data.topics);
            generateTopicDict(topics);
            generateTopicOptionsList(topics);

        },
        function (data) {
            console.log("No document types found");
        }
    );


    function generateTopicDict(topics){
        for(var i = 0; i < topics.length; i++){
            topics_dict[topics[i].id] = topics[i];
            $.extend(topics_dict,
                generateTopicDict(topics[i].children));
        }
    }



    function generateTopicOptionsList(topics){
        topics_options_list.length = 0;
        Array.prototype.push.apply(topics_options_list, generateTopicOptionsListHelper(0, "", topics));
    }

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

    function updateTopic(data){
        var old_topic = topics_dict[data.id];
        if(old_topic.parentId != data.parentId){
            removeById(old_topic.id);
            setTopic(topics_dict[data.id], data);
            addTopic(old_topic);
        }
        else{
            setTopic(topics_dict[data.id], data);
        }
    }


    function submit(topic){

        if(topic.parentId == "null" || topic.parentId == ""){
            topic.parentId = null;
        }

        if(topic.id){
            $rootScope.put('topics/'+topic.id,
                topic,
                function(data){
                    updateTopic(data);
                    generateTopicOptionsList(topics);
                    $rootScope.notifySuccess('Tema ble oppdatert',6000);

                },
                function(data){
                    $rootScope.notifyError('Tema ble ikke oppdatert.',6000);
                });
        }
        else{
            $rootScope.post(
                'topics/',
                topic,
                function(data){
                    $rootScope.notifySuccess('Ny tema ble opprettet.',6000);
                    addTopic(data);
                },function(){
                    $rootScope.notifyError('Tema ble ikke opprettet.',6000);
                }
            );
        }
    }

    function removeById(id){
        var element = topics_dict[id];
        var siblings = topics_dict[element.parentId].children;
        removeElementFromArray(element, siblings);
    }

    function removeElementFromArray(element, array){
        var index = array.indexOf(element);
        if (index > -1) {
            array.splice(index, 1);
        }
        generateTopicOptionsList(topics);
        generateTopicDict(topics);
    }

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

    function clone(topic){
        var t = {};
        setTopic(t, topic);
        return t;
    }

    function deleteTopic(topic){
        deleteById(topic.id);
    }
    function deleteById(id){
        if(id){
            $rootScope.delete('topics/'+id,
                function(data){
                    removeById(id);
                    $rootScope.notifySuccess('Topic ble fjernet',6000);

                },
                function(data){
                    $rootScope.notifyError('Topic ble ikke fjernet.',6000);
                });
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