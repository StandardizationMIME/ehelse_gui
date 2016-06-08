/**
 * Returns action list
 * @returns {Array}
 */
function getActions(){
    return list.actions;
}

/**
 * Returns status list
 * @returns {Array}
 */
function getStatus(){
    return list.status;
}

/**
 * Returns topic tree
 */
function getTopics(){
    return getTopicTree();
}

function getTopicTree(){

    var topic_three = [];
    var topic_dict = [];
    var topic_children = [];
    var topic_list = cloneObjectList(list.topics);

    for (i = 0; i < topic_list.length; i++) {
        var topic = cloneObjectList(topic_list[i]);
        var parent_id = topic.parentId;
        if (parent_id == null) {
            topic_three.push(topic)
        } else {
            if (!(parent_id in topic_children)) {
                topic_children[parent_id] = [];
            }
            topic_children[parent_id] = topic;
        }
        topic_dict[topic.id] = topic;
    }

    for (i = 1; i <= topic_children.length; i++) {
        var parent = topic_dict[i];
        parent.children = topic_children[i];
    }

    return topic_three;
}

function cloneObjectList(list){
    return (JSON.parse(JSON.stringify(list)));
}

console.log(JSON.stringify(getTopicTree()));








