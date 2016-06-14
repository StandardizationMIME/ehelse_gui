"use strict";

angular.module("ehelseEditor").factory("DownloadList",
    ["$rootScope", "FileUpload", "ServiceFunction", "StorageHandler", "Action", "Document", "DocumentField", "DocumentType", "LinkCategory", "Mandatory", "Status", "TargetGroup", "Topic",
    function ($rootScope, FileUpload, ServiceFunction, StorageHandler, Action, Document, DocumentField, DocumentType, LinkCategory, Mandatory, Status, TargetGroup, Topic) {

        /**
         * Returns list of topics ready for storage
         * @param topics
         * @returns {Array}
         */
        function constructOutputTopics(topics) {
            return (getFlatTopics(topics));
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
                console.log(topic);
                // Topic has children, add children to the result list
                if (topic.children) {
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
                delete document["profiles"];

                output_documents.push(document);
            }
            return output_documents;
        }

        /**
         * Returns deep copy of documents
         *
         * Removes the list populatedProfiles to avoid circular dependencies.
         * @param list
         * @returns {Array}
         */
        function cloneDocuments(list) {
            var clone = [];
            for (var i = 0; i < list.length; i++) {
                var element = list[i];
                var element_clone = ServiceFunction.cloneObject(element);
                if (element_clone.populatedProfiles) {
                    delete element_clone["populatedProfiles"];
                }
                clone.push(element_clone);
            }
            return clone;
        }

        /**
         * Returns storage list
         * @returns {Array}
         */
        function getStorageList() {
            var output_list = {};
            output_list["actions"] = Action.getAll();
            output_list["documentFields"] = DocumentField.document_fields; // TODO: implement DocumentField.getAll()
            output_list["documentTypes"] = DocumentType.document_types; // TODO: implement DocumentType.getAll()
            output_list["linkCategories"] = LinkCategory.getAll();
            output_list["mandatory"] = Mandatory.getAll();
            output_list["targetGroups"] = TargetGroup.getAll();
            output_list["status"] = Status.getAll();
            output_list["topics"] = constructOutputTopics(ServiceFunction.cloneObject(Topic.getAll()));
            output_list["documents"] = constructOutputDocuments(cloneDocuments(Document.getAll()));
            output_list["archivedDocuments"] = cloneDocuments(StorageHandler.getArchivedDocuments());

            return output_list;
        }

        return {
            getStorageList: getStorageList
        };
}]);

