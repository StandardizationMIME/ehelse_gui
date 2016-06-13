"use strict";

angular.module("ehelseEditor").factory("DownloadList",
    ["$rootScope", "FileUpload", "StorageHandler", "Action", "Document", "DocumentField", "DocumentType", "LinkCategory", "Mandatory", "Status", "TargetGroup", "Topic",
    function ($rootScope, FileUpload, StorageHandler, Action, Document, DocumentField, DocumentType, LinkCategory, Mandatory, Status, TargetGroup, Topic) {

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
            output_list["status"] = Status.getAll();
            output_list["topics"] = constructOutputTopics(Topic.getAll());
            output_list["documents"] = constructOutputDocuments(Document.getAll());
            output_list["archivedDocuments"] = StorageHandler.getArchivedDocuments();

            /*
            output_list.push({"actions": Action.getAll()});
            output_list.push({"documentFields": DocumentField.document_fields}); // TODO: implement DocumentField.getAll()
            output_list.push({"documentTypes": DocumentType.document_types}); // TODO: implement DocumentType.getAll()
            output_list.push({"linkCategories": LinkCategory.getAll()});
            output_list.push({"mandatory": Mandatory.getAll()});
            output_list.push({"status": Status.getAll()});
            output_list.push({"topics": constructOutputTopics(Topic.getAll())});
            output_list.push({"documents": constructOutputDocuments(Document.getAll())});
            output_list.push({"archivedDocuments": StorageHandler.getArchivedDocuments()});    // TODO: implement archived documents list.
            */
            return output_list;
        }

        return {
            getStorageList: getStorageList
        };
}]);

