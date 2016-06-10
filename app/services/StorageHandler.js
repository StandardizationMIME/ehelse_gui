"use strict";

angular.module("ehelseEditor").factory("StorageHandler", ["$rootScope", function ($rootScope) {

    //var input_list; // TODO: Must be set from input file.

    var input_list = {
        "status": [
            {
                "id": "1",
                "name": "Aktiv",
                "description": "Aktive dokumenter"
            },
            {
                "id": "2",
                "name": "Ikke i refkat",
                "description": "Dokumenter som er ikke med i referansekatalogen"
            },
            {
                "id": "81",
                "name": "Under innfasing",
                "description": "Dokumenter som er under innfasing"
            }
        ],
        "topics": [
            {
                "id": "1",
                "timestamp": "2016-05-19 03:55:34",
                "title": "I. Informasjonssikkerhet",
                "description": null,
                "sequence": "2",
                "parentId": null,
                "comment": null,
                "documents": []
            },
            {
                "id": "2",
                "timestamp": "2016-05-19 03:55:57",
                "title": "III. Informasjonsinnhold og strukturert f\u00f8ring av journal",
                "description": null,
                "sequence": "3",
                "parentId": 1,
                "comment": null,
                "documents": []
            },
            {
                "id": "3",
                "timestamp": "2016-05-19 03:55:57",
                "title": "III. Informasjonsinnhold og strukturert f\u00f8ring av journal",
                "description": null,
                "sequence": "1",
                "parentId": 2,
                "comment": null,
                "documents": []
            },
            {
                "id": "4",
                "timestamp": "2016-05-19 03:55:57",
                "title": "test",
                "description": null,
                "sequence": 2,
                "parentId": null,
                "comment": null,
                "documents": []
            },
            {
                "id": "5",
                "timestamp": "2016-05-19 03:55:57",
                "title": "te2223st",
                "description": null,
                "sequence": 2,
                "parentId": 1,
                "comment": null,
                "documents": []
            }

        ],
        "documents": [
            {
                "id": "1",
                "timestamp": "2016-06-08 03:08:23",
                "title": "test",
                "description": "s",
                "statusId": "1",
                "sequence": "10",
                "topicId": "161",
                "comment": null,
                "documentTypeId": "1",
                "standardId": null,
                "previousDocumentId": null,
                "nextDocumentId": "387",
                "internalId": "1",
                "hisNumber": null,
                "isArchived": 0,
                "fields": [
                    {
                        "fieldId": "156",
                        "value": "as"
                    }
                ],
                "links": [
                    {
                        "id": "7",
                        "text": "google",
                        "description": null,
                        "url": "google.com",
                        "linkCategoryId": "28",
                        "documentId": "1"
                    },
                    {
                        "id": "9",
                        "text": "bing",
                        "description": null,
                        "url": "bing.com",
                        "linkCategoryId": "3",
                        "documentId": "1"
                    }
                ],
                "targetGroups": [
                    {
                        "documentId": "1",
                        "description": "w",
                        "actionId": "2",
                        "deadline": "w",
                        "mandatoryId": "1",
                        "targetGroupId": "10"
                    },
                    {
                        "documentId": "1",
                        "description": "w",
                        "actionId": "2",
                        "deadline": "w",
                        "mandatoryId": "1",
                        "targetGroupId": "11"
                    }
                ]

            },
            {
                "id": "1",
                "timestamp": "2016-06-03 03:08:23",
                "title": "test",
                "description": "s",
                "statusId": "1",
                "sequence": "1",
                "topicId": "161",
                "comment": null,
                "documentTypeId": "1",
                "standardId": null,
                "previousDocumentId": null,
                "nextDocumentId": "387",
                "internalId": "1",
                "hisNumber": null,
                "isArchived": 1
            },
            {
                "id": "2",
                "timestamp": "2016-06-03 03:08:23",
                "title": "test",
                "description": "s",
                "statusId": "1",
                "sequence": "11",
                "topicId": "161",
                "comment": null,
                "documentTypeId": "1",
                "standardId": null,
                "previousDocumentId": null,
                "nextDocumentId": "387",
                "internalId": "1",
                "hisNumber": null,
                "isArchived": 0
            },
            {
                "id": "3",
                "timestamp": "2016-06-03 03:08:23",
                "title": "test",
                "description": "s",
                "statusId": "1",
                "sequence": "1",
                "topicId": "161",
                "comment": null,
                "documentTypeId": "1",
                "standardId": 2,
                "previousDocumentId": null,
                "nextDocumentId": "387",
                "internalId": "1",
                "hisNumber": null,
                "isArchived": 0
            },
            {
                "id": "4",
                "timestamp": "2016-06-03 03:08:23",
                "title": "test2",
                "description": "s",
                "statusId": "1",
                "sequence": "1",
                "topicId": "161",
                "comment": null,
                "documentTypeId": "1",
                "standardId": 2,
                "previousDocumentId": null,
                "nextDocumentId": "387",
                "internalId": "1",
                "hisNumber": null,
                "isArchived": 0
            }
        ],
        "targetGroups": [
            {
                "id": "10",
                "name": "Ambulanse",
                "description": "Ambulansetjenesten",
                "parentId": null,
                "abbreviation": "AMB"
            },
            {
                "id": "11",
                "name": "Spesialisthelsetjenesten",
                "description": null,
                "parentId": null,
                "abbreviation": null
            }
        ],
        "actions": [
            {
                "id": "2",
                "name": "Motta",
                "description": "Denne standarden kan brukes for mottakelse"
            },
            {
                "id": "3",
                "name": "Sende\/motta",
                "description": "Denne standarden kan brukes b\u00e5de for sending og mottakelse"
            },
            {
                "id": "52",
                "name": "Send",
                "description": "Denne standarden skal brukes ved sending"
            }
        ],
        "documentTypes": [
            {
                "id": "1",
                "name": "Standard"
            },
            {
                "id": "2",
                "name": "Profil"
            },
            {
                "id": "3",
                "name": "St\u00f8ttedokument"
            }
        ],
        "linkCategories": [
            {
                "id": "2",
                "name": "Kravdokument",
                "description": null
            },
            {
                "id": "3",
                "name": "Relaterte dokument",
                "description": null
            },
            {
                "id": "23",
                "name": "Bibliografi",
                "description": null
            }
        ],
        "mandatory": [
            {
                "id": "1",
                "name": "Obligatorisk",
                "description": "M\u00e5 brukes av alle relevante m\u00e5lgrupper"
            },
            {
                "id": "3",
                "name": "Anbefalt",
                "description": "Anbefalt for alle relevante m\u00e5lgrupper"
            },
            {
                "id": "12",
                "name": "Frivillig",
                "description": "Kan brukes fritt"
            }
        ],
        "documentFields": [
            {
                "id": "154",
                "name": "Versjon",
                "description": "Versjonnummer",
                "sequence": "1",
                "mandatory": "0",
                "documentTypeId": "1"
            },
            {
                "id": "155",
                "name": "asd",
                "description": null,
                "sequence": "1",
                "mandatory": "1",
                "documentTypeId": "3"
            },
            {
                "id": "156",
                "name": "asd",
                "description": null,
                "sequence": "1",
                "mandatory": "1",
                "documentTypeId": "2"
            },
            {
                "id": "164",
                "name": "Merknad",
                "description": "Her skriver du merknader",
                "sequence": "1",
                "mandatory": "0",
                "documentTypeId": "1"
            },
            {
                "id": "165",
                "name": "Alternativ ID",
                "description": null,
                "sequence": "1",
                "mandatory": "0",
                "documentTypeId": "1"
            },
            {
                "id": "162",
                "name": "Test",
                "description": null,
                "sequence": "2",
                "mandatory": "1",
                "documentTypeId": "2"
            },
            {
                "id": "76",
                "name": "Refkat id",
                "description": "Refkat id",
                "sequence": "5",
                "mandatory": "0",
                "documentTypeId": "1"
            },
            {
                "id": "78",
                "name": "Utgivers ID",
                "description": null,
                "sequence": "6",
                "mandatory": "0",
                "documentTypeId": "1"
            }
        ]
    };



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
            } else {
                // If topic_children[parent_id] does not exist, add it
                if (!(parent_id in topic_children)) {
                    topic_children[parent_id] = [];
                }
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
            // Only non-archived documents is handled
            if (document.isArchived == 0) {
                delete document["isArchived"];
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
        }
        // Add profiles list to the documents with profiles
        for (var index in profiles) {
            document_dict[index].profiles = profiles[index];
        }
        // Sort documents on sequence
        document_list.sort(SORT_ON_SEQUENCE);

        return document_list;
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
        getTargetGroups: getTargetGroups
    };
}]);