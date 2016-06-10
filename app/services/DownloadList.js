"use strict";

angular.module("ehelseEditor").factory("DownloadList", ["$rootScope", "Document",
    function ($rootScope, Document) {

        /*
         angular.module("ehelseEditor").factory("StorageHandler",
         ["$rootScope", "FileUpload", "Action", "Document", "DocumentField", "DocumentType", "LinkCategory", "Mandatory", "Status", "TargetGroup", "Topic",
         function ($rootScope, FileUpload) {
         */

        var input_list = FileUpload.getJsonFile();

        var SORT_ON_SEQUENCE = function (a, b) { // Constant for sequence sort (ascending)
            return a.sequence - b.sequence;
        };

        function constructOutputTopics(topics) {
            return(getFlatTopics(topics));
        }

        /**
         * Returns a flat version of the topic tree for storage
         * @param list
         * @returns {Array}
         */
        function getFlatTopics(list) {
            var result = [];
            for (var i = 0; i < list.length; i++) {
                var topic = list[i];
                // Topic has children, add children to the result list
                if (topic.children.length > 0) {
                    var children = getFlatTopics(topic.children);
                    // Add each children to the result list
                    for (var j = 0; j < children.length; j++) {
                        result.push(children[j]);
                    }
                }
                // Delete the children list for topic before it is added to the result list
                delete topic["children"];
                result.push(topic);
            }
            return result;
        }

        /**
         * Returns list of documents ready for storage
         * @param documents
         * @returns {Array}
         */
        function constructOutputDocuments(documents) {
            var output_documents = [];
            for (var i = 0; i < documents.length; i++) {
                var document = documents[i];
                document["isArchived"] = 0;
                delete document["profiles"];
                output_documents.push(document);
            }
            return output_documents;
        }

        function getStorageList() {
            var output_list = [];
            console.log("something");
            console.log(Document.getAll());
            return output_list;
        }

        return {
            getStorageList: getStorageList
        };
    }]);