"use strict";

angular.module("ehelseEditor").factory("StorageHandler", ["$rootScope", "FileUpload",
    function ($rootScope, FileUpload) {

        var input_list = FileUpload.getJsonFile();

        var SORT_ON_SEQUENCE = function (a, b) { // Constant for sequence sort (ascending)
            return a.sequence - b.sequence;
        };

        /**
         * Returns a clone of a multidimensional array
         * @param list
         */
        function cloneObjectList(list) {
            return (JSON.parse(JSON.stringify(list)));
        }

        /**
         * Returns action list
         * @returns {Array}
         */
        function getActions() {
            return {"actions": input_list.actions.sort()};
        }

        /**
         * Return document list
         * @returns {{documents: Array}}
         */
        function getDocuments() {
            return {"documents": getDocumentWithProfilesList()};
        }

        /**
         * Returns document field list
         * @returns {{documentFields: Array}}
         */
        function getDocumentFields() {
            var sorted_document_list = input_list.documentFields.sort(SORT_ON_SEQUENCE);
            return {"documentFields": sorted_document_list};
        }

        /**
         * Returns document types
         */
        function getDocumentTypes() {
            return {"documentTypes": input_list.documentTypes};
        }

        /**
         * Returns link categories
         */
        function getLinkCategories() {
            return {"linkCategories": input_list.linkCategories};
        }

        /**
         * Returns status list
         * @returns {Array}
         */
        function getStatus() {
            return {"status": input_list.status};
        }

        /**
         * Returns mandatory list
         * @returns {{mandatory: Array}}
         */
        function getMandatory() {
            return {"mandatory": input_list.mandatory};
        }

        /**
         * Returns topic tree
         */
        function getTopics() {
            return {"topics": getTopicTree()};
        }

        /**
         * Returns target groups
         */
        function getTargetGroups() {
            return {"targetGroups": input_list.targetGroups};
        }


        /**
         * Returns tree structure of topics
         *
         * The tree structure consists of
         * @returns {Array}
         */
        function getTopicTree() {

            var topic_tree = [];    // Tree to return
            var topic_dict = [];    // Dictionary with id of topics
            var topic_children = [];    // List on the format topic_children[parent_id] : [child1,...,childN]
            var topic_list = input_list.topics;

            for (var i = 0; i < topic_list.length; i++) {
                var topic = cloneObjectList(topic_list[i]);
                var parent_id = topic.parentId;
                // If topic does not have a parent, push to list (level 0 of topic_tree)
                if (parent_id == null) {
                    topic_tree.push(topic);
                    topic.children = [];
                } else {
                    // If topic_children[parent_id] does not exist, add it
                    if (!(parent_id in topic_children)) {
                        topic_children[parent_id] = [];
                    }
                    topic.children = [];
                    topic_children[parent_id].push(topic);
                }
                topic_dict[topic.id] = topic;
            }
            // Add the children lists (topic_children[parent_id]) to their parents
            for (var index in topic_children) {
                var parent = topic_dict[index];
                // Sort each children list on sequence
                topic_children[index].sort(SORT_ON_SEQUENCE);

                parent.children = topic_children[index];
            }
            // Sort topics on sequence
            topic_tree.sort(SORT_ON_SEQUENCE);

            return topic_tree;
        }

        /**
         * Returns document tree
         * @returns {Array}
         */
        function getDocumentWithProfilesList() {
            var document_list = [];
            var document_dict = [];
            var documents = cloneObjectList(input_list.documents);
            var profiles = [];

            for (var i = 0; i < documents.length; i++) {
                var document = cloneObjectList(documents[i]);
                var id = document.id;
                var standard_id = document.standardId;
                document_dict[id] = document;
                // add profiles list to document, if it does not exist
                if (!("profiles" in document)) {
                    //console.log("Add profile list")
                    document["profiles"] = [];
                }
                // If the document has a standards_id, it is a profile of another document.
                if (standard_id != null) {
                    if (!(standard_id in profiles)) {
                        profiles[standard_id] = []
                    }
                    profiles[standard_id].push({"id": id});
                }
                document_list.push(document);
            }
            // Add profiles list to the documents with profiles
            for (var index in profiles) {
                document_dict[index].profiles = profiles[index];
            }
            // Sort documents on sequence
            document_list.sort(SORT_ON_SEQUENCE);
            return document_list;
        }

        /**
         * Returns list of archived documents by id
         * @param id
         * @returns {*}
         */
        function getArchivedDocumentsById(id) {
            return input_list.archivedDocuments[id];
        }

        /**
         * Adds document to archivedDocuments by id
         *
         * @param id
         * @returns {boolean}
         */
        function addArchivedDocumentsById(id) {
            var archived_documents = input_list.archivedDocuments;
            var documents = input_list.documents;
            for (var i = 0; i < documents.length; i++) {
                if (documents[i].id == id) {
                    if (id in archived_documents)
                        archived_documents[id].push(documents[i]);
                    else
                        archived_documents[id] = [documents[i]];
                }
            }
        }

        return {
            getActions: getActions,
            getDocuments: getDocuments,
            getDocumentFields: getDocumentFields,
            getDocumentTypes: getDocumentTypes,
            getLinkCategories: getLinkCategories,
            getStatus: getStatus,
            getMandatory: getMandatory,
            getTopics: getTopics,
            getTargetGroups: getTargetGroups,
            getArchivedDocumentsById: getArchivedDocumentsById,
            addArchivedDocumentsById: addArchivedDocumentsById
        };
    }]);